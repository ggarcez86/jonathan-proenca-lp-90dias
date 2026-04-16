"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginDashboard(formData: FormData) {
  const password = formData.get("password") as string;
  const masterPass = process.env.DASHBOARD_PASS;

  if (!masterPass) {
    return { error: "Variável DASHBOARD_PASS não configurada no servidor." };
  }

  if (password === masterPass) {
    const cookieStore = await cookies();
    // Setando o cookie criptograficamente no HTTP response.
    // Ele expira em 7 dias, é HttpOnly e Secure.
    cookieStore.set("dashboard_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // O redirect joga o usuário pro dashboard central
    redirect("/dashboard");
  } else {
    return { error: "Senha incorreta. Acesso negado." };
  }
}

export async function logoutDashboard() {
  const cookieStore = await cookies();
  cookieStore.delete("dashboard_auth");
  redirect("/dashboard/login");
}
