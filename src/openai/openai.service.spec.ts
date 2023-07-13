import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIService } from './openai.service';
import * as dotenv from 'dotenv';
import { OpenAIModule } from './openai.module';
import { OpenAIConfig } from './openai.interfaces';
import * as process from 'process';

describe('OpenAIService', () => {
  let service: OpenAIService;

  beforeAll(async () => {
    dotenv.config();
  });

  beforeEach(async () => {
    const mockConfig: OpenAIConfig = {
      apiKey: process.env.OPENAI_API_KEY,
      systemMessage: process.env.SYSTEM_MESSAGE,
      temperature: 0.7,
      modelName: 'gpt-3.5-turbo',
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
    const response = await service.chatCompletion('Hello, World!');
    expect(response).toBeDefined();
  });
});
