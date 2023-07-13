import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    OpenAIModule.forRoot({
      apiKey: process.env.OPENAI_API_KEY,
      systemMessage:
        process.env.SYSTEM_MESSAGE || 'You are a helpful assistant.',
      temperature: parseFloat(process.env.TEMPERATURE) || 0.7,
      modelName: process.env.MODEL_NAME || 'gpt-3.5-turbo',
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
