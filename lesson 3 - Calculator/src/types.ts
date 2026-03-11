export type ControlButtons = (string | string[])[];

export type NumberButtons = string[][];

export type AddContent = (content: string) => void;

export type HandleError = (content: string) => boolean;

export interface ControlHook {
    controls: ControlButtons;
    addContent: AddContent;
    handleError: HandleError;
}

export interface NumbersHook {
    controls: ControlButtons;
    numbers: NumberButtons;
    addContent: AddContent;
    handleError: HandleError;
}

export interface MonitorHook {
    monitor1: string;
    monitor2: string;
}

export type ErrorMessage =
    "Cannot divide by zero!"
    | "Invalid Input!"
    | undefined;