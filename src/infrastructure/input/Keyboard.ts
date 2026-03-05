
/**
 * Código especial utilizado para representar la tecla Ñ en el teclado virtual.
 * 
 * A diferencia de las demás teclas, que utilizan el valor estándar de `KeyboardEvent.code`
 * como `"KeyA"`, `"KeyB"`, etc., la Ñ se representa mediante `"semicolon"` porque en muchos 
 * teclados es la tecla física mapeada como `Semicolon` en JavaScript.
 *
 * Esta constante se utiliza tanto para validación como para conversión a letra.
 */

const SEMICOLON_CODE = "semicolon";


/**
 * Conjunto de códigos válidos que representan letras del teclado físico o virtual.
 * 
 * Incluye:
 * - Todas las letras de la A a la Z usando su código estándar (`"KeyA"`, `"KeyB"`, etc.)
 * - El código especial `"semicolon"` para la letra Ñ
 *
 * Este conjunto permite validar rápidamente si un `KeyboardEvent.code` corresponde a una letra.
 */
const LETTER_CODE = new Set([
    "KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP",
    "KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL",
    "KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM", SEMICOLON_CODE // = Ñ
]);


/**
 * Determina si un código pertenece a una tecla que representa una letra válida
 * en el teclado físico o virtual.
 *
 * @param {string} code - Código capturado desde `KeyboardEvent.code` o desde un botón del teclado virtual.
 * @returns {boolean} `true` si corresponde a una letra; `false` en caso contrario.
 */
export function isLetterCode(code: string): boolean {
    return LETTER_CODE.has(code);
}


/**
 * Determina si el código recibido corresponde a la tecla Enter.
 *
 * @param {string} code - Código recibido desde un evento de entrada.
 * @returns {boolean} `true` si es "Enter".
 */
export function isEnterCode(code: string): boolean{
    return code === "Enter";
}


/**
 * Determina si el código recibido corresponde a la tecla Backspace.
 *
 * Nota: Algunos navegadores exponen este código como `"Backspace"` (camelCase),
 * mientras que el uso aquí es `"BackSpace"`; si detectas inconsistencias,
 * puedes ajustar esta comparación.
 *
 * @param {string} code - Código capturado desde un evento de entrada.
 * @returns {boolean} `true` si corresponde a la tecla borrar; `false` en caso contrario.
 */
export function isBackspaceCode(code: string): boolean{
    return code === "BackSpace";
}


/**
 * Convierte un código de tecla en la letra correspondiente.
 *
 * Reglas:
 * - Si el código es `"semicolon"`, retorna `"Ñ"`.
 * - Para códigos estándar `"KeyX"`, elimina el prefijo `"Key"` y retorna la letra sola.
 *
 * Ejemplos:
 *  - `"KeyA"` → `"A"`
 *  - `"KeyM"` → `"M"`
 *  - `"semicolon"` → `"Ñ"`
 *
 * @param {string} code - Código capturado desde el teclado físico o virtual.
 * @returns {string} La letra correspondiente.
 */
export function codeToLetter(code: string): string{
    return code === SEMICOLON_CODE ? "Ñ" : code.replace("Key","");
}
