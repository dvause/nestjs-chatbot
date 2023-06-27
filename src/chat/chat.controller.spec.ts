import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { OpenAIService } from '../openai/openai.service';

describe('ChatController', () => {
  let controller: ChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        ChatService,
        { provide: OpenAIService, useValue: OpenAIService },
      ],
    }).compile();

    controller = module.get<ChatController>(ChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
