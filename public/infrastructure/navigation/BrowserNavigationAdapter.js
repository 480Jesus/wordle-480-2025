var BrowserNavigationAdapter = /** @class */ (function () {
    function BrowserNavigationAdapter() {
    }
    BrowserNavigationAdapter.prototype.goToWin = function () {
        location.assign("/winner");
    };
    BrowserNavigationAdapter.prototype.goToLose = function () {
        location.assign("/loser");
    };
    return BrowserNavigationAdapter;
}());
export { BrowserNavigationAdapter };
