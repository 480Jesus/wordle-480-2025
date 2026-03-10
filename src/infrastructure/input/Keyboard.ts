const SEMICOLON_CODE = "Semicolon";
const LETTER_CODE = new Set([
    "KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP",
    "KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL",
    "KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM", SEMICOLON_CODE // = Ñ
]);

export function isLetterCode(code: string): boolean {
    return LETTER_CODE.has(code);
}

export function isEnterCode(code: string): boolean {
    return code === "Enter";
}

export function isBackspace(code: string): boolean {
    return code === "Backspace";
}

export function codeToLetter(code: string): string {
    return code === SEMICOLON_CODE ? "\u00D1" : code.replace("Key", "");
}
