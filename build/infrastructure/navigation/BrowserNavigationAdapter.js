export class BrowserNavigationAdapter {
    goToWin() {
        this.showResultScreen("winner-screen");
    }
    goToLose() {
        this.showResultScreen("loser-screen");
    }
    showResultScreen(screenId) {
        const game = document.getElementById("main_container");
        const winner = document.getElementById("winner-screen");
        const loser = document.getElementById("loser-screen");
        if (!game || !winner || !loser)
            return;
        game.classList.add("hidden");
        winner.classList.add("hidden");
        loser.classList.add("hidden");
        const selected = document.getElementById(screenId);
        if (!selected)
            return;
        selected.classList.remove("hidden");
    }
}
