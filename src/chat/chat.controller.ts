import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatCompletionResponseMessage } from 'openai';
import { ChatMessageDto } from './dto/chat-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(
    @Body() chatMessageDto: ChatMessageDto,
  ): Promise<ChatCompletionResponseMessage> {
    console.log('chatMessageDto', chatMessageDto);
    return await this.chatService.chat(chatMessageDto);
  }
}
