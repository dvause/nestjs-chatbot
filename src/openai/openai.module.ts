import { Module, Global, DynamicModule } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OpenAIConfig } from './openai.interfaces';

@Global()
@Module({
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {
  static forRoot(config: OpenAIConfig): DynamicModule {
    return {
      module: OpenAIModule,
      providers: [
        {
          provide: 'OPENAI_CONFIG',
          useValue: config,
        },
        OpenAIService,
      ],
      exports: [OpenAIService],
    };
  }
}
