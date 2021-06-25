import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from 'src/entities/score.entity';
import { ScoreController } from '../controllers/score.controller';
import { ScoreService } from '../services/score.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  controllers: [ScoreController],
  providers: [ScoreService],  
  exports: [ScoreService],
})
export class ScoreModule {}
