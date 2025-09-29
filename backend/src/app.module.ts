import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config'; 
import { ContributionsModule } from './contributions/contributions.module';
import { VotesModule } from './votes/votes.module';
import { UsersModule } from './users/users.module';
import { ChaptersModule } from './chapters/chapters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    BooksModule,
    ContributionsModule,
    VotesModule,
    UsersModule,
    ChaptersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}