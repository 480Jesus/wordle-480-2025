import type { InputHandler, InputSourcePort } from "../../application/ports/InputSourcePort.js";
import { isBackspace, isEnterCode, isLetterCode } from "./Keyboard.js";

type HotModule = {
    dispose: (cb: () => void) => void;
};

function normalizeCode(event: KeyboardEvent): string | null {
    const rawCode = event.code === "NumpadEnter" ? "Enter" : event.code;
    if (isLetterCode(rawCode) || isEnterCode(rawCode) || isBackspace(rawCode)) {
        return rawCode;
    }

    const key = event.key;
    if (!key) return null;

    if (key === "Enter") return "Enter";
    if (key === "Backspace") return "Backspace";
    if (key === "\u00D1" || key === "\u00F1") return "Semicolon";

    if (key.length === 1 && /^[a-z]$/i.test(key)) {
        return `Key${key.toUpperCase()}`;
    }

    return null;
}

export class DomKeyboardInputAdapter implements InputSourcePort {
    private currentHandler: InputHandler | null = null;
    private removeWindowListener: (() => void) | null = null;
    private removeClickListeners: Array<() => void> = [];

    subscribe(handler: InputHandler): void {
        this.detach();
        this.currentHandler = handler;

        const onKeyDown = (event: KeyboardEvent): void => {
            const normalizedCode = normalizeCode(event);
            if (!normalizedCode || !this.currentHandler) return;
            event.preventDefault();
            this.currentHandler(normalizedCode);
        };

        window.addEventListener("keydown", onKeyDown);
        this.removeWindowListener = () => window.removeEventListener("keydown", onKeyDown);

        Array.from(document.getElementsByClassName("key")).forEach((element) => {
            const onClick = (event: Event): void => {
                event.preventDefault();
                const button = event.currentTarget as HTMLButtonElement | null;
                const code = button?.value ?? null;
                if (!code || !this.currentHandler) return;
                this.currentHandler(code);
            };

            element.addEventListener("click", onClick);
            this.removeClickListeners.push(() => element.removeEventListener("click", onClick));
        });

        const hot = (import.meta as ImportMeta & { hot?: HotModule }).hot;
        hot?.dispose(() => this.detach());
    }

    private detach(): void {
        this.removeWindowListener?.();
        this.removeWindowListener = null;

        this.removeClickListeners.forEach((remove) => remove());
        this.removeClickListeners = [];

        this.currentHandler = null;
    }
}
