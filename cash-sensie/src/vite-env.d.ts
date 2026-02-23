/// <reference types="vite/client" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "emoji-picker": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        onEmojiClick?: (event: any) => void;
      };
    }
  }
}

export {};
