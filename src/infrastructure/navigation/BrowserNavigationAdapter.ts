import { NavigationPort } from "../../application/ports/NavigationPort";

export class InMemoryWordProvider implements NavigationPort{
   
    goToWin(): void {
        location.assign("/winner");

    }
    goToLose(): void {
        location.assign("/loser")

    }
}