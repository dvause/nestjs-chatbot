import { Injectable, Logger } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessage,
} from 'openai';
import { ChatMessageDto } from './dto/chat-message.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private messages: ChatCompletionRequestMessage[] = [];

  constructor(
    private readonly configService: ConfigService,
    private readonly openAIService: OpenAIService,
  ) {}

  async chat(
    chatMessageDto: ChatMessageDto,
  ): Promise<ChatCompletionResponseMessage> {
    // If this is the first message, add the system prompt.
    if (this.messages.length === 0) {
      const systemPrompt =
        this.configService.get<string>('SYSTEM_PROMPT') ||
        'You are a helpful assistant.';

      const systemMessage: ChatCompletionRequestMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: systemPrompt,
      };
      this.messages.push(systemMessage);
    }
    const userMessage: ChatCompletionRequestMessage = {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: chatMessageDto.message,
    };
    this.messages.push(userMessage);
    const response = await this.openAIService.chatCompletion(this.messages);
    this.messages.push(response);
    this.logger.log('messages', this.messages);
    return response;
  }
}
