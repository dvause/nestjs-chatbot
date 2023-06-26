import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { ChatCompletionResponseMessage } from 'openai';

@Injectable()
export class ChatService {
  constructor(private readonly openAIService: OpenAIService) {}

  async chat(): Promise<ChatCompletionResponseMessage> {
    return await this.openAIService.chat();
  }
}
