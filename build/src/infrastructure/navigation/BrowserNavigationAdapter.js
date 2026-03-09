"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserNavigationAdapter = void 0;
class BrowserNavigationAdapter {
    goToWin() {
        location.assign("/winner");
    }
    goToLose() {
        location.assign("/loser");
    }
}
exports.BrowserNavigationAdapter = BrowserNavigationAdapter;
