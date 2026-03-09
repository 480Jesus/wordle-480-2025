export class BrowserNavigationAdapter {
    goToWin() {
        void this.showResultPage("winner.html");
    }
    goToLose() {
        void this.showResultPage("loser.html");
    }
    async showResultPage(page) {
        const game = document.getElementById("main_container");
        const result = document.getElementById("result-screen");
        if (!game || !result)
            return;
        game.classList.add("hidden");
        result.classList.remove("hidden");
        try {
            const response = await fetch(page);
            const html = await response.text();
            const parsed = new DOMParser().parseFromString(html, "text/html");
            result.innerHTML = parsed.body ? parsed.body.innerHTML : html;
        }
        catch {
            result.innerHTML = page === "winner.html" ? "<h1>HAS GANADO!!!</h1>" : "<h1>HAS PALMADO</h1>";
        }
    }
}
