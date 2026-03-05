var SEMICOLON_CODE = "Semicolon";
var LETTER_CODE = new Set([
    "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
    "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",
    "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", SEMICOLON_CODE // = Ñ
]);
export function isLetterCode(code) {
    return LETTER_CODE.has(code);
}
export function isEnterCode(code) {
    return code === "Enter";
}
export function isBackspace(code) {
    return code === "Backspace"; // ✅ Corregido: era "BackSpace" con S mayúscula
}
export function codeToLetter(code) {
    return code === SEMICOLON_CODE ? "Ñ" : code.replace("Key", "");
}
