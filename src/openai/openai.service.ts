import { Injectable, Inject } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { OpenAIConfig } from './openai.interfaces';

@Injectable()
export class OpenAIService {
  private apiClient: OpenAIApi;

  constructor(@Inject('OPENAI_CONFIG') private readonly config: OpenAIConfig) {
    const configuration = new Configuration({ apiKey: this.config.apiKey });
    this.apiClient = new OpenAIApi(configuration);
  }

  async chat() {
    const chatCompletion = await this.apiClient.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello world' }],
    });
    return chatCompletion.data.choices[0].message;
  }
}
