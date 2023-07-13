import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { ChatMessageDto } from './dto/chat-message.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  constructor(
    private readonly configService: ConfigService,
    private readonly openAIService: OpenAIService,
  ) {}

  async chat(chatMessageDto: ChatMessageDto) {
    return await this.openAIService.chatCompletion(chatMessageDto.message);
  }
}
