import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from '../controllers/teacher.controller';
import { Teacher } from '../entities/teacher.entity';
import { TeacherService } from '../services/teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService],  
  exports: [TeacherService]

})
export class TeacherModule {}
