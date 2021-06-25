import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from '../controllers/course.controller';
import { Course } from '../entities/course.entity';
import { CourseService } from '../services/course.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService],  
  exports: [CourseService]

})
export class CourseModule {}
