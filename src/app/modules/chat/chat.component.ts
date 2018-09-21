import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'chat-app',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    message: any;
    messages: any[] = [];

    connection: Subscription
    constructor(
        private chatService: ChatService
    ) { }

    ngOnInit() {
        this.connection = this.chatService.getMessages().subscribe(newMessage => {
            this.messages.push(newMessage);
        });
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }

    sendMessage() {
        if (!this.message)
            return
        this.chatService.sendMessage(this.message);
        this.message = '';
    }
}
