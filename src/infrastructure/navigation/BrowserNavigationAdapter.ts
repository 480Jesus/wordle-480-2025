import type { NavigationPort } from "../../application/ports/NavigationPort.js";

export class BrowserNavigationAdapter implements NavigationPort {
    goToWin(): void {
        location.assign("/winner.html");
    }

    goToLose(): void {
        location.assign("/loser.html");
    }
}
