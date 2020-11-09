export interface XYEvent {
    type: string;
}

export interface Listener<T> {
    (event: T & XYEvent): void;
}

declare class Events {
    constructor();

    addEventListener<T>(type: string, lisenter: Listener<T>): void;
    on<T>(type: string, lisenter: Listener<T>): void;
    removeEventListener<T>(type: string, lisenter: Listener<T>): void;
    off<T>(type: string, lisenter: Listener<T>): void;

    dispatchEvent<T>(event: T & XYEvent): boolean;
    dispatchEvent<T>(type: string, ...args): boolean;

    removeAllEventListener(): void;
}

export { Events };
export default Events;
