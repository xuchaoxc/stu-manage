import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateScoreDto, ListAllScoreDto, UpdateScoreDto } from 'src/dtos/score';
import { ScoreService } from 'src/services/score.service';

interface ScoreResponse<T = unknown> {
    code: number;
    data?: T;
    message: string;
  } 

@Controller('scores')
export class ScoreController {
      constructor(
    private readonly scoreService: ScoreService
    ){}
    
    @Get()
    findAllScores(): Promise<ListAllScoreDto[]> {
      return this.scoreService.findAllScores();
    }


    @Post()
    async createScore(@Body() createClazsDto: CreateScoreDto): Promise<ScoreResponse> {
        const data =await this.scoreService.createScore(createClazsDto);
        return {code: 200, data: data, message: '添加成功'};
    }
  
    @Delete(':id')
    async deleteScore(@Param('id') id: string): Promise<ScoreResponse> {
        await this.scoreService.deleteScore(id);
        return { code: 200, message: '删除成功' };
    }
  
    @Get(':id')
    async findOneScore(@Param('id') id: string): Promise<ScoreResponse> {
        const data = await this.scoreService.findOneScore(id);
        return {code: 200, data: data, message: '查找成功'};
    }
    
    @Put(':id')
    async updateScore(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto): Promise<ScoreResponse> {
        await this.scoreService.updateScore(id, updateScoreDto);
        return { code: 200, message: '更新成功' };
    }
  
}
