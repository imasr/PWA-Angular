import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private socket = io(environment.baseUrl)
    constructor() {
    }

    joinRoom(data) {
        console.log(data);
        this.socket.emit('join', data);
    }



    public typing(data) {
        console.log(data);
        this.socket.emit('typing', data);
    }
    public receivedTyping = () => {
        return Observable.create((observer) => {
            this.socket.on('typing', (data) => {
                console.log(data);

                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }
    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                console.log(message);

                observer.next(message);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }
}
