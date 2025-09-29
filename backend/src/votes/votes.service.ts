import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  async toggleVote(contributionId: string, userId: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
    });

    if (!contribution) {
      throw new NotFoundException(
        `Contribuição com ID "${contributionId}" não encontrada.`,
      );
    }

    const existingVote = await this.prisma.vote.findUnique({
      where: {
        userId_contributionId: {
          userId: userId,
          contributionId: contributionId,
        },
      },
    });

    if (existingVote) {
      await this.prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });
      return { message: 'unvoted', voteCount: await this.getVoteCount(contributionId) };
    }

    await this.prisma.vote.create({
      data: {
        contribution: { connect: { id: contributionId } },
        user: { connect: { id: userId } },
      },
    });
    return { message: 'voted', voteCount: await this.getVoteCount(contributionId) };
  }

  private async getVoteCount(contributionId: string): Promise<number> {
    const count = await this.prisma.vote.count({
      where: { contributionId: contributionId },
    });
    return count;
  }
}