export type InputHandler = (code:String) => void;

export interface InputSourcePort {
    subscribe (handler: InputHandler): void;
}
