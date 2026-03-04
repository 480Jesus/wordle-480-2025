var DomKeyboardInputAdapter = /** @class */ (function () {
    function DomKeyboardInputAdapter() {
    }
    DomKeyboardInputAdapter.prototype.suscribe = function (handler) {
        Array.from(document.getElementsByClassName("key")).forEach(function (element) {
            element.addEventListener("click", function (e) {
                var button = e.currentTarget;
                handler(button.value);
            });
        });
        document.addEventListener("keydown", function (e) {
            handler(e.code);
        });
    };
    ;
    return DomKeyboardInputAdapter;
}());
export { DomKeyboardInputAdapter };
