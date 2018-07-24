import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }
    public getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    public clearLocalStorage() {
        localStorage.clear()
    }
    public removeItemLocalStorage(key) {
        localStorage.removeItem(key)
    }
}
