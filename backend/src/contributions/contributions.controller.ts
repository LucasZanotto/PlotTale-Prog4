import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class ContributionsController {
  constructor(
    private readonly contributionsService: ContributionsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('books/:bookId/contributions')
  create(
    @Body() createContributionDto: CreateContributionDto,
    @Param('bookId') bookId: string,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.contributionsService.create(
      createContributionDto,
      bookId,
      userId,
    );
  }

  @Get('books/:bookId/contributions')
  findAllForBook(@Param('bookId') bookId: string) {
    return this.contributionsService.findAllForBook(bookId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('contributions/:contributionId/accept')
  accept(
    @Param('contributionId') contributionId: string,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.contributionsService.accept(contributionId, userId);
  }
}