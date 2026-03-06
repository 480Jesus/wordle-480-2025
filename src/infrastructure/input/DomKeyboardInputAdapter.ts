import { InputHandler, InputSourcePort } from "../../application/ports/InputSourcePort";

export class DomKeyboardInputAdapter implements InputSourcePort {
    subscribe(handler: InputHandler): void {

        Array.from(document.getElementsByClassName("key")).forEach((element) => {
            element.addEventListener("click", (e: Event) => {
                e.preventDefault();
                const button = e.currentTarget as HTMLButtonElement;
                handler(button.value);
            });
        });

        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.code === "Enter" && (e.target as HTMLElement).tagName === "BUTTON") {
                e.preventDefault();
                handler("Enter");
                return;
            }
            handler(e.code);
        });
    }
}