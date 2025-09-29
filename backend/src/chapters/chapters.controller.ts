import { Controller, Get, Param } from '@nestjs/common';
import { ChaptersService } from './chapters.service';

@Controller('books/:bookId/chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Get()
  findAllForBook(@Param('bookId') bookId: string) {
    return this.chaptersService.findAllForBook(bookId);
  }
}