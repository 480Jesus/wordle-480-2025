import { NavigationPort } from "../../application/ports/NavigationPort";

export class BrowserNavigationAdapter implements NavigationPort {
    
    goToWin(): void {
        location.assign("/winner");
    }

    goToLose(): void {
        location.assign("/loser");
    }
}