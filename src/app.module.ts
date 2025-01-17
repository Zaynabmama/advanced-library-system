import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DB_URL');
        const logger = new Logger('DatabaseConnection');
        logger.log(`Connecting to Database: ${dbUrl}`);
        return { uri: dbUrl };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
