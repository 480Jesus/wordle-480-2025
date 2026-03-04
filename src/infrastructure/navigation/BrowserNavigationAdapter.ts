import { NavigationPort } from "../../application/ports/NavigationPort";

export class InMemoryWordProvider implements NavigationPort{
    getRandomWord() {
        throw new Error("Method not implemented.");
    }
   
    goToWin(): void {
        location.assign("/winner");

    }
    goToLose(): void {
        location.assign("/loser")

    }
}