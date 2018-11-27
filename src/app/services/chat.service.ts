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
        this.socket.emit('join', data);
    }



    public typing(data) {
        this.socket.emit('typing', data);
    }
    public receivedTyping = () => {
        return Observable.create((observer) => {
            this.socket.on('typing', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }

    sendMessage(message) {
        console.log(message);

        this.socket.emit('new-message', message);
    }
    getMessages = () => {
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
