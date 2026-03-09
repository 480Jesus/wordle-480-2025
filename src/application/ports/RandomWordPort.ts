export interface RandomWordPort {
 getRandomWord(): Promise<string>;
 resetWord(): void;
}
