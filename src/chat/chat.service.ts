import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessage,
} from 'openai';
import { ChatMessageDto } from './dto/chat-message.dto';

@Injectable()
export class ChatService {
  private messages: ChatCompletionRequestMessage[] = [];
  constructor(private readonly openAIService: OpenAIService) {}

  async chat(
    chatMessageDto: ChatMessageDto,
  ): Promise<ChatCompletionResponseMessage> {
    // If this is the first message, add a system message.
    if (this.messages.length === 0) {
      const systemMessage: ChatCompletionRequestMessage = {
        role: 'system',
        content: 'Hello, I am a chatbot. I am here to help you.',
      };
      this.messages.push(systemMessage);
    }
    const userMessage: ChatCompletionRequestMessage = {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: chatMessageDto.message,
    };
    this.messages.push(userMessage);
    const response = await this.openAIService.chat(this.messages);
    this.messages.push(response);
    console.log('messages', this.messages);
    return response;
  }
}
