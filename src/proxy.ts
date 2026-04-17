import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apenas protegemos rotas filhas de /dashboard (excluindo a própria página de login)
  if (pathname.startsWith("/dashboard") && pathname !== "/dashboard/login") {
    // Procura o cookie assinado da sessão
    const authCookie = request.cookies.get("dashboard_auth");

    if (!authCookie || authCookie.value !== "true") {
      // Se não tem cookie, barrado. Joga pro /dashboard/login
      const loginUrl = new URL("/dashboard/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // A matcher rule garante que o middleware só rode nesses paths, economizando processamento edge
  matcher: ["/dashboard/:path*"],
};
