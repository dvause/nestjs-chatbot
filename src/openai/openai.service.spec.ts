import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIService } from './openai.service';
import * as dotenv from 'dotenv';
import { OpenAIModule } from './openai.module';
import * as process from 'process';
import { OpenAIConfig } from './openai.interfaces';

describe('OpenAIService', () => {
  let service: OpenAIService;

  beforeAll(async () => {
    dotenv.config();
  });

  beforeEach(async () => {
    const mockConfig: OpenAIConfig = {
      apiKey: process.env.OPENAI_API_KEY,
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
    const response = await service.chat();
    console.log(response);
    expect(response).toBeDefined();
  });
});
