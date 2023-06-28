import { Injectable, Inject } from '@nestjs/common';
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from 'openai';
import { OpenAIConfig } from './openai.interfaces';

@Injectable()
export class OpenAIService {
  private apiClient: OpenAIApi;

  constructor(@Inject('OPENAI_CONFIG') private readonly config: OpenAIConfig) {
    const configuration = new Configuration({ apiKey: this.config.apiKey });
    this.apiClient = new OpenAIApi(configuration);
  }

  async chatCompletion(
    messages: ChatCompletionRequestMessage[],
  ): Promise<ChatCompletionResponseMessage> {
    try {
      const chatCompletion = await this.apiClient.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
      });
      return chatCompletion.data.choices[0].message;
    } catch (error) {
      if (error.response?.status) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }

  async completion(prompt: string): Promise<string> {
    try {
      const completion = await this.apiClient.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.7,
      });
      // console.log(completion.data);
      return completion.data.choices[0].text;
    } catch (error) {
      if (error.response?.status) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
}
