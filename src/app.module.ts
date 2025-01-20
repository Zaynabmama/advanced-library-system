import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EmailService } from './global/services/email.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtGuard } from './global/guard/jwt.guard';
import { LoggingInterceptor } from './global/logging.interceptor';
import { GlobalModule } from './global/global.module';
import { BooksModule } from './modules/books/books.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { BranchesModule } from './modules/branches/branches.module';

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
    GlobalModule,
    AuthModule,
    UsersModule,
    BooksModule,
    ReviewsModule,
    BranchesModule,
   
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard, 
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  //exports: [EmailService],
})
export class AppModule {}
