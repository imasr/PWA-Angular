import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from "rxjs";
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
    selector: 'chat-app',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    message: any;
    messages: any[] = [];
    loggedInuser: any
    isTyping: boolean
    showChats: boolean = true
    connection: Subscription
    constructor(
        private chatService: ChatService,
        private storageService: LocalStorageService
    ) { }

    ngOnInit() {
        this.loggedInuser = {
            username: this.storageService.getLocalStorage('result').username,
            email: this.storageService.getLocalStorage('result').email,
            _id: this.storageService.getLocalStorage('result')._id
        }
        this.connection = this.chatService.getMessages().subscribe(new_message => {
            this.messages.push(new_message);
            this.isTyping = false;
        });
        this.chatService.receivedTyping().subscribe(bool => {
            this.isTyping = bool.isTyping;
        });
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }

    typing() {
        this.chatService.typing(this.loggedInuser)
    }


    sendMessage() {
        if (!this.message)
            return
        this.chatService.sendMessage(this.message);
        this.message = '';
    }
}
