import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
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
    showChats: boolean = true
    isTyping: boolean
    @Input() chatData: any
    @Output() closeRoom: EventEmitter<any> = new EventEmitter()
    connection: Subscription
    chatroom: any
    constructor(
        private chatService: ChatService,
        private storageService: LocalStorageService
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes.chatData.currentValue);
        this.getDatDForChatroom(changes.chatData.currentValue)
    }

    getDatDForChatroom(data) {
        const user = data._id;
        const currentUser = this.storageService.getLocalStorage('result')._id
        if (currentUser < user) {
            this.chatroom = currentUser.concat('_' + user);
        } else {
            this.chatroom = user.concat('_' + currentUser);
        }
        this.chatService.joinRoom({ username: this.storageService.getLocalStorage('result').username, room: this.chatroom })
    }

    ngOnInit() {
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
    close() {
        this.closeRoom.emit(this.chatData)
    }

    typing() {
        this.chatService.typing(this.chatData)
    }


    sendMessage() {
        if (!this.message)
            return
        this.chatService.sendMessage({
            room: this.chatroom,
            message: this.message,
            timestamp: Date.now()
        });
        this.message = '';
    }
}
