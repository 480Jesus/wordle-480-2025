/**
 * El juego utiliza este handler para gestionar cada interación del usuario, independientemente
 * de si proviene de un teclado físico o de un teclado en pantalla.
 * 
 * @callback InputHandler
 * @param {string} code - Código de tecla (por ejemplo, "KeyA" para la letra A) que representa la interacción del usuario.
 * @returns {void} No devuelve ningún valor.
 */
export type InputHandler = (code: string) => void;

export interface InputSourcePort {

    
    /**
     * Registra el handler de entrada para recibir los códigos  de tecla generados por cualquiera de los dos teclados.
     * 
     *
     * @param {InputHandler} handler - Función que recibirá cada código de tecla como evento de entrada.
     * @returns {void} No devuelve ningún valor.
     */
    subscribe (handler: InputHandler): void;
}
