export type InputHandler = (code:String) => void;

export interface InputSource {
    subscribe (handler: InputHandler): void;
}

