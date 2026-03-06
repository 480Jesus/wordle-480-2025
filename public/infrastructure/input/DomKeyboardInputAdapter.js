var DomKeyboardInputAdapter = /** @class */ (function () {
    function DomKeyboardInputAdapter() {
    }
    DomKeyboardInputAdapter.prototype.subscribe = function (handler) {
        // Teclado visual (botones en pantalla)
        Array.from(document.getElementsByClassName("key")).forEach(function (element) {
            element.addEventListener("click", function (e) {
                e.preventDefault(); // ✅ Evita que el click dispare también un keydown
                var button = e.currentTarget;
                handler(button.value);
            });
        });
        // Teclado físico
        document.addEventListener("keydown", function (e) {
            // ✅ Evita que Enter físico se ejecute dos veces si el foco está en un botón
            if (e.code === "Enter" && e.target.tagName === "BUTTON") {
                e.preventDefault();
                handler("Enter");
                return;
            }
            handler(e.code);
        });
    };
    return DomKeyboardInputAdapter;
}());
export { DomKeyboardInputAdapter };
