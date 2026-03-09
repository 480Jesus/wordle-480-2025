"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomKeyboardInputAdapter = void 0;
class DomKeyboardInputAdapter {
    subscribe(handler) {
        Array.from(document.getElementsByClassName("key")).forEach((element) => {
            element.addEventListener("click", (e) => {
                e.preventDefault();
                const button = e.currentTarget;
                handler(button.value);
            });
        });
        document.addEventListener("keydown", (e) => {
            if (e.code === "Enter" && e.target.tagName === "BUTTON") {
                e.preventDefault();
                handler("Enter");
                return;
            }
            handler(e.code);
        });
    }
}
exports.DomKeyboardInputAdapter = DomKeyboardInputAdapter;
