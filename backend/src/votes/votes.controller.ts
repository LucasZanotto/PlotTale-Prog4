import { Controller, Post, Param, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { VotesService } from './votes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('contributions/:contributionId/votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK) 
  @Post()
  toggle(@Param('contributionId') contributionId: string, @Request() req) {
    const userId = req.user.id;
    return this.votesService.toggleVote(contributionId, userId);
  }
}