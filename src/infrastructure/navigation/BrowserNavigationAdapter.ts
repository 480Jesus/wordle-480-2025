import type { NavigationPort } from "../../application/ports/NavigationPort.js";

export class BrowserNavigationAdapter implements NavigationPort {
    goToWin(): void {
        location.assign("/winner.html");
    }

    goToLose(correctWord?: string): void {
        if (correctWord) {
            location.assign(`/loser.html?word=${correctWord}`);
            return;
        }
        location.assign("/loser.html");
    }
}
