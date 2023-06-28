import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatCompletionResponseMessage } from 'openai';
import { ChatMessageDto } from './dto/chat-message.dto';

@Controller('chat')
export class ChatController {
  private readonly logger = new Logger(ChatController.name);
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(
    @Body() chatMessageDto: ChatMessageDto,
  ): Promise<ChatCompletionResponseMessage> {
    return await this.chatService.chat(chatMessageDto);
  }
}
