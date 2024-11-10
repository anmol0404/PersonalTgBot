interface Memory {
    value: boolean;
    cancel: boolean;
    stopDeletion: boolean;
    stopAdding: boolean;
    stopCollection: boolean;
    stopCopy: boolean;
    set(newValue: boolean): void;
    get(): boolean;
    setCancel(newCancel: boolean): void;
    getCancel(): boolean;
    setStopDeletion(value: boolean): void;
    getStopDeletion(): boolean;
    setStopAdding(value: boolean): void;
    getStopAdding(): boolean;
    setStopCollection(value: boolean): void;
    getStopCollection(): boolean;
    setStopCopy(value: boolean): void;
    getStopCopy(): boolean;
}
declare const memory: Memory;
export default memory;
