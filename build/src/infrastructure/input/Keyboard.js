"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLetterCode = isLetterCode;
exports.isEnterCode = isEnterCode;
exports.isBackspace = isBackspace;
exports.codeToLetter = codeToLetter;
const SEMICOLON_CODE = "Semicolon";
const LETTER_CODE = new Set([
    "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
    "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",
    "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", SEMICOLON_CODE // = Ñ
]);
function isLetterCode(code) {
    return LETTER_CODE.has(code);
}
function isEnterCode(code) {
    return code === "Enter";
}
function isBackspace(code) {
    return code === "Backspace";
}
function codeToLetter(code) {
    return code === SEMICOLON_CODE ? "Ñ" : code.replace("Key", "");
}
