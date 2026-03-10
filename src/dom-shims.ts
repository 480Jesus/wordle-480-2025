// Minimal DOM declarations to allow server-side TypeScript compilation
// while keeping tsconfig lib restricted to ES2020 + node types.
declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface Event {
    preventDefault(): void;
    currentTarget: unknown;
    target: unknown;
  }

  interface KeyboardEvent extends Event {
    code: string;
    key: string;
  }

  interface ClassList {
    add(...tokens: string[]): void;
    remove(...tokens: string[]): void;
    contains(token: string): boolean;
  }

  interface HTMLElement {
    tagName: string;
    textContent: string | null;
    innerHTML: string;
    children: ArrayLike<HTMLElement>;
    classList: ClassList;
    addEventListener(
      type: string,
      listener: (event: Event) => void,
      options?: { once?: boolean }
    ): void;
    removeEventListener(type: string, listener: (event: Event) => void): void;
  }

  interface HTMLButtonElement extends HTMLElement {
    value: string;
  }

  const document: {
    readyState: string;
    getElementsByClassName(className: string): ArrayLike<HTMLElement>;
    addEventListener(
      type: string,
      listener: (event: any) => void,
      options?: { once?: boolean }
    ): void;
    getElementById(id: string): HTMLElement | null;
  };

  const window: {
    addEventListener(type: string, listener: (event: KeyboardEvent) => void): void;
    removeEventListener(type: string, listener: (event: KeyboardEvent) => void): void;
  };

  const location: {
    assign(url: string): void;
  };

  const sessionStorage: {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
  };

  class DOMParser {
    parseFromString(
      input: string,
      mimeType: string
    ): { body: { innerHTML: string } | null };
  }
}

export {};
