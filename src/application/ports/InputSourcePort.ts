export type InputHandler = (code: string) => void;

export interface InputSourcePort {
    subscribe (handler: InputHandler): void;
}
