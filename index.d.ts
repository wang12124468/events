export interface XYEvent {
    type: string;
}

export interface Lisenter<T> {
    (event: T & XYEvent): void;
}

declare class Events {
    constructor();

    addEventListener<T>(type: string, lisenter: Lisenter<T>): void;
    on<T>(type: string, lisenter: Lisenter<T>): void;
    removeEventListener<T>(type: string, lisenter: Lisenter<T>): void;
    off<T>(type: string, lisenter: Lisenter<T>): void;

    dispatchEvent<T>(event: T & XYEvent): boolean;
    dispatchEvent<T>(type: string, ...args): boolean;
}

export { Events };
export default Events;
