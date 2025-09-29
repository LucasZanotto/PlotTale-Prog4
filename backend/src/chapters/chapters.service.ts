import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChaptersService {
  constructor(private prisma: PrismaService) {}

  async findAllForBook(bookId: string) {
    return this.prisma.chapter.findMany({
      where: { bookId },
      orderBy: {
        chapterNumber: 'asc',
      },
      include: {
        author: { 
          select: { id: true, name: true },
        },
      },
    });
  }
}