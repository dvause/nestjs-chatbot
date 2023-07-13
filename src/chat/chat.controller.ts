import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/chat-message.dto';

@Controller('chat')
export class ChatController {
  private readonly logger = new Logger(ChatController.name);
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() chatMessageDto: ChatMessageDto) {
    this.logger.log('chatMessageDto', chatMessageDto);
    return await this.chatService.chat(chatMessageDto);
  }
}
