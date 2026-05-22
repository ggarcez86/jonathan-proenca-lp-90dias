export {};

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": {
        id?: string;
        style?: { [key: string]: string | number | undefined };
        className?: string;
      };
    }
  }
}
