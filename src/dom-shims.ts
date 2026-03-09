// Minimal DOM declarations to allow server-side TypeScript compilation
// while keeping tsconfig lib restricted to ES2020 + node types.
declare global {
  interface Event {
    preventDefault(): void;
    currentTarget: unknown;
    target: unknown;
  }

  interface KeyboardEvent extends Event {
    code: string;
  }

  interface ClassList {
    add(...tokens: string[]): void;
    remove(...tokens: string[]): void;
    contains(token: string): boolean;
  }

  interface HTMLElement {
    tagName: string;
    textContent: string | null;
    children: ArrayLike<HTMLElement>;
    classList: ClassList;
    addEventListener(
      type: string,
      listener: (event: Event) => void,
      options?: { once?: boolean }
    ): void;
  }

  interface HTMLButtonElement extends HTMLElement {
    value: string;
  }

  const document: {
    getElementsByClassName(className: string): ArrayLike<HTMLElement>;
    addEventListener(type: string, listener: (event: KeyboardEvent) => void): void;
    getElementById(id: string): HTMLElement | null;
  };

  const location: {
    assign(url: string): void;
  };
}

export {};
