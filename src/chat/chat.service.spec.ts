import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { OpenAIService } from '../openai/openai.service';
import { ConfigService } from '@nestjs/config';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: OpenAIService, useValue: OpenAIService },
        { provide: ConfigService, useValue: ConfigService },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
