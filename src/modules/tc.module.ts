import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TcController } from '../controllers/tc.controller';
import { Tc } from '../entities/tc.entity';
import { TcService } from '../services/tc.service';

@Module({
  imports:[TypeOrmModule.forFeature([Tc])],
  controllers: [TcController],
  providers: [TcService],
  exports: [TcService],
})
export class TcModule {}
