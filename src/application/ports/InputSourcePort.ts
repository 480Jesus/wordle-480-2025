export type InputHandler = (input: string) => void;

export interface InputSourcePort {
    suscribe(handler: InputHandler): void;
}