import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto, userId: string) {
    return this.prisma.book.create({
      data: {
        title: createBookDto.title,
        synopsis: createBookDto.synopsis,
        genre: createBookDto.genre,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll(title?: string, genre?: string) {
    return this.prisma.book.findMany({
      where: {
        title: title ? { contains: title } : undefined,
        genre: genre ? { equals: genre } : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    });

    if (!book) {
      throw new NotFoundException(`Livro com ID "${id}" não encontrado.`);
    }
    return book;
  }

  async update(bookId: string, userId: string, updateBookDto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new NotFoundException(`Livro com ID "${bookId}" não encontrado.`);
    }

    if (book.authorId !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar este livro.');
    }

    return this.prisma.book.update({
      where: { id: bookId },
      data: updateBookDto,
    });
  }

  async remove(bookId: string, userId: string) {
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new NotFoundException(`Livro com ID "${bookId}" não encontrado.`);
    }

    if (book.authorId !== userId) {
      throw new ForbiddenException('Você não tem permissão para remover este livro.');
    }

    return this.prisma.book.delete({
      where: { id: bookId },
    });
  }
}