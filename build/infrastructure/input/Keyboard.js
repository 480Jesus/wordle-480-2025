var SEMICOLON_CODE = "semicolon";
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
export function isBackspaceCode(code) {
    return code === "BackSpace";
}
export function codeToLetter(code) {
    return code === SEMICOLON_CODE ? "Ñ" : code.replace("Key", "");
}
// code ="KeyT"
// code === semicolon -> false 
//: code.replace("Key", "")
// Esto elimina  "Key" del texto y te deja "T"
//codeToLetter("KeyT") -> "T"
//SEMICOLON_CODE ? "Ñ" sustuye semicolom por la Ñ
