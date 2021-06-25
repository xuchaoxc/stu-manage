import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Score } from '../entities/score.entity';
import { CreateScoreDto, ListAllScoreDto, UpdateScoreDto } from '../dtos/score';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    private readonly _con: Connection,
 ) {}
    
  //展示全部成绩信息
  async findAllScores(): Promise<ListAllScoreDto[]> {
    const scores = await this.scoreRepository.find();
    return scores.map((score): ListAllScoreDto => score.toResponseObject());
  }

  

  //根据ID查询
  async findOneScore(id: string): Promise<ListAllScoreDto> {
    return await this.findOneById(id);
} 
  async findOneById(id: string): Promise<ListAllScoreDto> {
    return await this.scoreRepository.findOne(id);
  }


  //添加
  async createScore(params: CreateScoreDto): Promise<ListAllScoreDto> {
    const { stuId, courseId} = params;
    let sco = await this.scoreRepository.findOne({ where: { stuId, courseId } });
    if (sco) {
      throw new HttpException('该成绩信息已存在', HttpStatus.BAD_REQUEST);
    }
    sco = await this.scoreRepository.create(params);
    await this.scoreRepository.save(sco);
    return sco.toResponseObject();
  }

  //删除
  async deleteScore(id: string): Promise<void> {
    await this.findOneById(id);
    await this.scoreRepository.delete(id);
  }

  //修改
  async updateScore(id: string, data: UpdateScoreDto): Promise<void> {
    await this.findOneById(id);
    await this.scoreRepository.update(id, data);
  }


}
