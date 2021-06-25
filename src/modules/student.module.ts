import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from '../controllers/student.controller';
import { Student } from '../entities/student.entity';
import { StudentService } from '../services/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService],  
  exports: [StudentService]
})
export class StudentModule {}
