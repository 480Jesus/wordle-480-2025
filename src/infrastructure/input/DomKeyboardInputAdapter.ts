import { InputHandler, InputSourcePort } from "../../application/ports/InputSourcePort";

export class DomKeyboardInputAdapter implements InputSourcePort {
    suscribe(handler: InputHandler): void {
        Array.from(document.getElementsByClassName("key")).forEach((element) => {
            element.addEventListener("click", (e: Event) => {
                const button = e.currentTarget as HTMLButtonElement;
                handler(button.value);
            });
        });

        document.addEventListener("keydown", (e: KeyboardEvent) => {
            handler(e.code)
        });
    };

}