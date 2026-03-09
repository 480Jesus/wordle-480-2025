import { NavigationPort } from "../../application/ports/NavigationPort.js";

export class BrowserNavigationAdapter implements NavigationPort {
    
    goToWin(): void {
        this.showResultScreen("winner-screen");
    }

    goToLose(): void {
        this.showResultScreen("loser-screen");
    }

    private showResultScreen(screenId: "winner-screen" | "loser-screen"): void {
        const game = document.getElementById("main_container");
        const winner = document.getElementById("winner-screen");
        const loser = document.getElementById("loser-screen");
        if (!game || !winner || !loser) return;

        game.classList.add("hidden");
        winner.classList.add("hidden");
        loser.classList.add("hidden");

        const selected = document.getElementById(screenId);
        if (!selected) return;
        selected.classList.remove("hidden");
    }
}
