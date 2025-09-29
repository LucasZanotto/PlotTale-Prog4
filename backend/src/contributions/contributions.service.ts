import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContributionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createContributionDto: CreateContributionDto,
    bookId: string,
    userId: string,
  ) {
    return this.prisma.contribution.create({
      data: {
        content: createContributionDto.content,
        book: { connect: { id: bookId } },
        author: { connect: { id: userId } },
      },
    });
  }

  async findAllForBook(bookId: string) {
    return this.prisma.contribution.findMany({
      where: {
        bookId: bookId,
        status: 'PENDING',
      },
      include: {
        author: { 
          select: { id: true, name: true },
        },
        _count: { 
          select: { votes: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async accept(contributionId: string, currentUserId: string) {
    const contributionToAccept = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
      include: {
        book: true, 
      },
    });

    if (!contributionToAccept) {
      throw new NotFoundException(`Contribuição com ID "${contributionId}" não encontrada.`);
    }

    if (contributionToAccept.book.authorId !== currentUserId) {
      throw new ForbiddenException('Apenas o autor do livro pode aceitar uma contribuição.');
    }

    const lastChapter = await this.prisma.chapter.findFirst({
      where: { bookId: contributionToAccept.bookId },
      orderBy: { chapterNumber: 'desc' },
    });
    const newChapterNumber = lastChapter ? lastChapter.chapterNumber + 1 : 1;

    return this.prisma.$transaction(async (tx) => {
      const newChapter = await tx.chapter.create({
        data: {
          title: `Capítulo ${newChapterNumber}`, 
          content: contributionToAccept.content,
          chapterNumber: newChapterNumber,
          book: { connect: { id: contributionToAccept.bookId } },
          author: { connect: { id: contributionToAccept.authorId } }, 
        },
      });

      await tx.contribution.update({
        where: { id: contributionId },
        data: { status: 'ACCEPTED' },
      });

      await tx.contribution.updateMany({
        where: {
          bookId: contributionToAccept.bookId,
          status: 'PENDING',
        },
        data: { status: 'REJECTED' },
      });

      return newChapter; 
    });
  }
}