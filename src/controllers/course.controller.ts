import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCourseDto, ListAllCourseDto, UpdateCourseDto} from '../dtos/course';
import { CourseService } from '../services/course.service';

interface CourseResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
} 

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService
    ){}
    
    @Get()
    findAllCourses(): Promise<ListAllCourseDto[]> {
      return this.courseService.findAllCourses();
    }
  
    @Get(':id/students')
    async findStuByCourseId(@Param('id') id: string): Promise<CourseResponse> {
        const data = await this.courseService.findStuByCourseId(id);
        return {code: 200, data: data, message: '选修该课程学生信息查找成功'};
    }

    @Get(':id/scores')
    async findScoreByCourseId(@Param('id') id: string,): Promise<CourseResponse> {
        const data = await this.courseService.findScoreByCourseId(id);
        return {code: 200, data: data, message: '该课程成绩信息查找成功'};
    }

    @Get(':id/teachers')
    async findTeacByCourseId(@Param('id') id: string,): Promise<CourseResponse> {
        const data = await this.courseService.findTeacByCourseId(id);
        return {code: 200, data: data, message: '该课程授课老师信息查找成功'};
    }

    @Post()
    async createCourse(@Body() createCourseDto: CreateCourseDto): Promise<CourseResponse> {
        const data =await this.courseService.createCourse(createCourseDto);
        return {code: 200, data: data, message: '添加成功'};
    }
  
    @Delete(':id')
    async deleteCourse(@Param('id') id: string): Promise<CourseResponse> {
        await this.courseService.deleteCourse(id);
        return { code: 200, message: '删除成功' };
    }
  
    @Get(':id')
    async findOneCourse(@Param('id') id: string): Promise<CourseResponse> {
        const data = await this.courseService.findOneCourse(id);
        return {code: 200, data: data, message: '查找成功'};
    }
    
    @Put(':id')
    async updateCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<CourseResponse> {
        await this.courseService.updateCourse(id, updateCourseDto);
        return { code: 200, message: '更新成功' };
    }
  
  }
  
  