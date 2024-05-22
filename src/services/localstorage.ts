import { LOCALSTORAGE_NAME } from "../constants";
import type { StateFields } from "../types";

const DEFAULT_STATE: StateFields = {};

class LocalStorageState {
    private fields: StateFields;

    constructor() {
        this.fields = this.loadState();
    }

    getField<T extends keyof StateFields>(name: T): StateFields[T] {
        return this.fields[name];
    }

    setField<T extends keyof StateFields>(name: T, value: StateFields[T]) {
        this.fields[name] = value;
    }

    saveState() {
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(this.fields));
    }

    loadState(): StateFields {
        const storageItem = localStorage.getItem(LOCALSTORAGE_NAME);

        if (storageItem) {
            return { ...DEFAULT_STATE, ...JSON.parse(storageItem) };
        }

        return { ...DEFAULT_STATE };
    }
}

export { LocalStorageState };
