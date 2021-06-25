import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScController } from '../controllers/sc.controller';
import { Sc } from '../entities/sc.entity';
import { ScService } from '../services/sc.service';

@Module({
  imports:[TypeOrmModule.forFeature([Sc])],
  controllers: [ScController],
  providers: [ScService],
  exports: [ScService],
})
export class ScModule {}
