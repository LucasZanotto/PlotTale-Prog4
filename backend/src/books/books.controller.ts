import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books') 
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createBookDto: CreateBookDto, @Request() req) {
    const userId = req.user.id; 
    return this.booksService.create(createBookDto, userId);
  }

  @Get()
  findAll(@Query('title') title?: string, @Query('genre') genre?: string) {
    return this.booksService.findAll(title, genre);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') bookId: string,
    @Request() req,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const userId = req.user.id;
    return this.booksService.update(bookId, userId, updateBookDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') bookId: string, @Request() req) {
    const userId = req.user.id;
    return this.booksService.remove(bookId, userId);
  }
}