export class BrowserNavigationAdapter {
    goToWin() {
        location.assign("/winner");
    }
    goToLose() {
        location.assign("/loser");
    }
}
