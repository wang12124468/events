export interface XYEvent {
    type: string;
}

export interface Lisenter<T> {
    (event: T & XYEvent): void;
}

export interface EventsInstance {
    addEventListener<T>(type: string, lisenter: Lisenter<T>): void;
    on<T>(type: string, lisenter: Lisenter<T>): void;
    removeEventListener<T>(type: string, lisenter: Lisenter<T>): void;
    off<T>(type: string, lisenter: Lisenter<T>): void;
    dispatchEvent<T>(event: T & XYEvent): boolean;
}

export interface XYEvents {
    new (): EventsInstance;
}

declare const Events: XYEvents;

export { Events };
export default Events;
