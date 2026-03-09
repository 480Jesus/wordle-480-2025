import type { InputHandler, InputSourcePort } from "../../application/ports/InputSourcePort.js";
import { isBackspace, isEnterCode, isLetterCode } from "./Keyboard.js";

export class DomKeyboardInputAdapter implements InputSourcePort {
    subscribe(handler: InputHandler): void {
        Array.from(document.getElementsByClassName("key")).forEach((element) => {
            element.addEventListener("click", (event: Event) => {
                event.preventDefault();
                const button = event.currentTarget as HTMLButtonElement | null;
                if (!button?.value) return;
                handler(button.value);
            });
        });

        document.addEventListener("keydown", (event: KeyboardEvent) => {
            const code = event.code === "NumpadEnter" ? "Enter" : event.code;

            if (!isLetterCode(code) && !isEnterCode(code) && !isBackspace(code)) {
                return;
            }

            event.preventDefault();
            handler(code);
        });
    }
}
