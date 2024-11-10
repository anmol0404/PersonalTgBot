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

const memory: Memory = {
  value: false,
  cancel: false,
  stopDeletion: false,
  stopAdding: false,
  stopCollection: false,
  stopCopy: false,

  set(newValue: boolean) {
    this.value = newValue;
  },

  get() {
    return this.value;
  },

  setCancel(newCancel: boolean) {
    this.cancel = newCancel;
  },

  getCancel() {
    return this.cancel;
  },

  setStopDeletion(value: boolean) {
    this.stopDeletion = value;
  },

  getStopDeletion() {
    return this.stopDeletion;
  },

  setStopAdding(value: boolean) {
    this.stopAdding = value;
  },

  getStopAdding() {
    return this.stopAdding;
  },

  setStopCollection(value: boolean) {
    this.stopCollection = value;
  },

  getStopCollection() {
    return this.stopCollection;
  },
  setStopCopy(value: boolean) {
    this.stopCollection = value;
  },

  getStopCopy() {
    return this.stopCollection;
  },
};

export default memory;
