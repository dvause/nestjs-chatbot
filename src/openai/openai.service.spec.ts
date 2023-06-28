import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIService } from './openai.service';
import * as dotenv from 'dotenv';
import { OpenAIModule } from './openai.module';
import { OpenAIConfig } from './openai.interfaces';
import { ChatCompletionRequestMessage } from 'openai';

describe('OpenAIService', () => {
  let service: OpenAIService;

  beforeAll(async () => {
    dotenv.config();
  });

  beforeEach(async () => {
    const mockConfig: OpenAIConfig = {
      apiKey: process.env.OPENAI_API_KEY,
      systemMessage: process.env.SYSTEM_MESSAGE,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [OpenAIModule.forRoot(mockConfig)],
      providers: [
        OpenAIService,
        { provide: 'OPENAI_CONFIG', useValue: mockConfig },
      ],
    }).compile();

    service = module.get<OpenAIService>(OpenAIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a chat response', async () => {
    const messages: ChatCompletionRequestMessage[] = [];
    const systemMessage: ChatCompletionRequestMessage = {
      role: 'system',
      content: 'Hello, I am a chatbot. I am here to help you.',
    };
    const userMessage: ChatCompletionRequestMessage = {
      role: 'user',
      content: 'Hello, World!',
    };
    messages.push(systemMessage);
    messages.push(userMessage);

    const response = await service.chatCompletion(messages);
    expect(response).toBeDefined();
  });

  it('should return a completion response', async () => {
    const prompt = 'Once upon a time';
    const response = await service.completion(prompt);
    expect(response).toBeDefined();
  });
});
