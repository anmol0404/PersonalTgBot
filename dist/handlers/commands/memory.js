var memory = {
    value: false,
    cancel: false,
    stopDeletion: false,
    stopAdding: false,
    stopCollection: false,
    stopCopy: false,
    set: function (newValue) {
        this.value = newValue;
    },
    get: function () {
        return this.value;
    },
    setCancel: function (newCancel) {
        this.cancel = newCancel;
    },
    getCancel: function () {
        return this.cancel;
    },
    setStopDeletion: function (value) {
        this.stopDeletion = value;
    },
    getStopDeletion: function () {
        return this.stopDeletion;
    },
    setStopAdding: function (value) {
        this.stopAdding = value;
    },
    getStopAdding: function () {
        return this.stopAdding;
    },
    setStopCollection: function (value) {
        this.stopCollection = value;
    },
    getStopCollection: function () {
        return this.stopCollection;
    },
    setStopCopy: function (value) {
        this.stopCollection = value;
    },
    getStopCopy: function () {
        return this.stopCollection;
    },
};
export default memory;
