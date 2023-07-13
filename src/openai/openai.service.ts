import { Inject, Injectable, Logger } from '@nestjs/common';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ChainValues } from 'langchain/schema';
import { OpenAIConfig } from './openai.interfaces';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from 'langchain/prompts';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  private readonly chat: ChatOpenAI;
  private memory: BufferMemory = new BufferMemory({
    returnMessages: true,
    memoryKey: 'history',
  });

  constructor(@Inject('OPENAI_CONFIG') private readonly config: OpenAIConfig) {
    this.chat = new ChatOpenAI({
      openAIApiKey: this.config.apiKey,
      temperature: this.config.temperature,
      modelName: this.config.modelName,
    });
  }

  async chatCompletion(userMessage: string): Promise<ChainValues> {
    const systemMessage = this.config.systemMessage;

    const chatPrompt: ChatPromptTemplate =
      ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(systemMessage),
        new MessagesPlaceholder('history'),
        HumanMessagePromptTemplate.fromTemplate('{text}'),
      ]);

    try {
      const chain = new ConversationChain({
        memory: this.memory,
        prompt: chatPrompt,
        llm: this.chat,
      });
      return await chain.call({
        text: userMessage,
      });
    } catch (error) {
      if (error.response?.status) {
        this.logger.error(error.response.status);
        this.logger.error(error.response.data);
      } else {
        this.logger.error(error.message);
      }
    }
  }

  // async completion(prompt: string): Promise<string> {
  //   try {
  //     const completion = await this.apiClient.createCompletion({
  //       model: 'text-davinci-003',
  //       prompt: prompt,
  //       temperature: 0.7,
  //     });
  //     // console.log(completion.data);
  //     return completion.data.choices[0].text;
  //   } catch (error) {
  //     if (error.response?.status) {
  //       this.logger.error(error.response.status);
  //       this.logger.error(error.response.data);
  //     } else {
  //       this.logger.error(error.message);
  //     }
  //   }
  // }
}
