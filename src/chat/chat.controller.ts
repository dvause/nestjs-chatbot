import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatCompletionResponseMessage } from 'openai';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async chat(): Promise<ChatCompletionResponseMessage> {
    return await this.chatService.chat();
  }
}
