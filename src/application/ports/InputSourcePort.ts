export type InputHandler = (input: string) => void;

export interface InputSourcePort {
    subscribe(handler: InputHandler): void;
}
