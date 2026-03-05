import { InputHandler, InputSourcePort } from "../../application/ports/InputSourcePort";

export class DomKeyboardInputAdapter implements InputSourcePort {
    subscribe(handler: InputHandler): void {

        // Teclado visual (botones en pantalla)
        Array.from(document.getElementsByClassName("key")).forEach((element) => {
            element.addEventListener("click", (e: Event) => {
                e.preventDefault(); // ✅ Evita que el click dispare también un keydown
                const button = e.currentTarget as HTMLButtonElement;
                handler(button.value);
            });
        });

        // Teclado físico
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            // ✅ Evita que Enter físico se ejecute dos veces si el foco está en un botón
            if (e.code === "Enter" && (e.target as HTMLElement).tagName === "BUTTON") {
                e.preventDefault();
                handler("Enter");
                return;
            }
            handler(e.code);
        });
    }
}