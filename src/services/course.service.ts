import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CreateCourseDto, ListAllCourseDto, UpdateCourseDto } from '../dtos/course';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
    
  //展示全部課程信息
  async findAllCourses(): Promise<ListAllCourseDto[]> {
    const courses = await this.courseRepository.find();
    return courses.map((course): ListAllCourseDto => course.toResponseObject());
  }


  //根据ID查询
  async findOneCourse(id: string): Promise<ListAllCourseDto> {
    return await this.findOneById(id);
} 
  async findOneById(id: string): Promise<ListAllCourseDto> {
    return await this.courseRepository.findOne(id);
  }

  //根据课程ID查询选修的学生信息
  async findStuByCourseId(id: string): Promise<Course[]> {
    return await this.courseRepository.find({ 
      where: { id: id },
      relations: ['students'] 
    });
  } 

  //根据课程ID查询成绩信息
  async findScoreByCourseId(id: string): Promise<Course[]> {
    return await this.courseRepository.find({ 
      where: { id: id },
      relations: ['score'] 
    });
  }

  //根据课程ID查询成绩信息
  async findTeacByCourseId(id: string): Promise<Course[]> {
    return await this.courseRepository.find({ 
      where: { id: id },
      relations: ['teachers'] 
    });
  }

  //添加
  async createCourse(params: CreateCourseDto): Promise<ListAllCourseDto> {
    const { courseNo } = params;
    let cou = await this.courseRepository.findOne({ where: { courseNo } });
    if (cou) {
      throw new HttpException('该课程编号已存在', HttpStatus.BAD_REQUEST);
    }
    cou = await this.courseRepository.create(params);
    await this.courseRepository.save(cou);
    return cou.toResponseObject();
  }

  //删除
  async deleteCourse(id: string): Promise<void> {
    await this.findOneById(id);
    await this.courseRepository.delete(id);
  }
  //修改
  async updateCourse(id: string, data: UpdateCourseDto): Promise<void> {
    await this.findOneById(id);
    await this.courseRepository.update(id, data);
  }


}
