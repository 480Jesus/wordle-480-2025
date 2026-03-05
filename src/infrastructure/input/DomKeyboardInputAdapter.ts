import { InputHandler, InputSourcePort } from "../../application/ports/InputSourcePort";


/**
 * Adaptador de entrada basado en el DOM.
 *
 * Implementa el puerto `InputSourcePort` para capturar interacciones del usuario
 * tanto desde el teclado físico como desde el teclado en pantalla.
 *
 * Este adaptador traduce eventos del DOM a eventos de la lógica del juego,
 * delegando cada interacción al `InputHandler` proporcionado por el controlador.
 *
 * Forma parte de la capa de infraestructura dentro de la arquitectura hexagonal.
 */

export class DomKeyboardInputAdapter implements InputSourcePort {
    
    /**
     * Registra un manejador que reaccionará a los eventos de entrada del usuario.
     *
     * Captura:
     * - Clicks en las teclas del teclado virtual (elementos con clase `"key"`).
     * - Pulsaciones del teclado físico mediante el evento `"keydown"`.
     *
     * En ambos casos, se llama al `handler` con un código de tecla estandarizado
     * (`KeyboardEvent.code` o `button.value`), permitiendo que la lógica de
     * aplicación funcione independientemente de la fuente de entrada.
     *
     * @param {InputHandler} handler - Función encargada de procesar los códigos de entrada.
     * @returns {void}
     */

    subscribe(handler: InputHandler): void {
       Array.from(document.getElementsByClassName("key")).forEach((element) => {
            element.addEventListener("click", (e: Event) => {
                const button = e.currentTarget as HTMLButtonElement;
                handler(button.value);
            });
        });

        document.addEventListener("keydown", (e: KeyboardEvent) => {
            handler(e.code)
        });
    }
}