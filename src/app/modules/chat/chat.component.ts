import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from "rxjs";
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ApiService } from 'src/app/services/api.service';

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
    connection: Subscription
    chatroom: any
    currentUser: any

    @Input() chatData: any
    @Output() closeRoom: EventEmitter<any> = new EventEmitter()
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(
        private chatService: ChatService,
        private apiService: ApiService,
        private storageService: LocalStorageService
    ) {
        this.connection = this.chatService.getMessages().subscribe(new_message => {
            this.messages.push(new_message);
            this.isTyping = false;
        });
        this.chatService.receivedTyping().subscribe(bool => {
            this.isTyping = bool.isTyping;
        });
    }



    ngOnInit() {
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getDatDForChatroom(changes.chatData.currentValue)
        this.messages = []
        this.apiService.getChat(this.chatroom).subscribe(res => {
            if (res[0].messages)
                this.messages = res[0].messages;
        }, err => {
            console.log(err);
        })
    }

    getDatDForChatroom(data) {
        const user = data._id;
        this.currentUser = this.storageService.getLocalStorage('result')._id
        if (this.currentUser < user) {
            this.chatroom = this.currentUser.concat('_' + user);
        } else {
            this.chatroom = user.concat('_' + this.currentUser);
        }
        console.log(this.chatroom);

        this.chatService.joinRoom({ username: this.storageService.getLocalStorage('result').username, room: this.chatroom })
    }


    ngOnDestroy() {

    }

    close() {
        this.closeRoom.emit(this.chatData)
    }

    typing() {
        this.chatService.typing({ room: this.chatroom })
    }


    sendMessage(message) {
        if (!message)
            return
        this.chatService.sendMessage({
            room: this.chatroom,
            message: message,
            senderId: this.currentUser,
            timestamp: Date.now()
        });
        this.message = '';
    }
}
