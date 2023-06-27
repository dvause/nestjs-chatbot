import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { OpenAIService } from '../openai/openai.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: OpenAIService, useValue: OpenAIService },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
