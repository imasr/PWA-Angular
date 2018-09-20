import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'chat-app',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    message: any;
    messages: any[] = [];
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(
        private chatService: ChatService
    ) { }

    ngOnInit() {
        this.chatService.getMessages().subscribe(newMessage => {
            this.messages.push(newMessage);
            this.scrollToBottom()
        });
    }

    sendMessage() {
        this.message = "hi ashish"
        this.chatService.sendMessage(this.message);
        this.message = '';
        this.scrollToBottom()
    }
    ngAfterViewInit() {
        this.scrollToBottom()
    }
    scrollToBottom(): void {
        window.scrollBy(0, this.myScrollContainer.nativeElement.scrollHeight);
    }

}
