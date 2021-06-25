import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateStuDto, ListAllStuDto, UpdateStuDto} from '../dtos/student';
import { StudentService } from '../services/student.service';

interface StuResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
} 

@Controller('students')
export class StudentController {
  constructor(
    private readonly stuService: StudentService
    ){}
    
    @Get()
    async findAllStus(): Promise<ListAllStuDto[]> {
      return this.stuService.findAllStus();
    }

    @Get(':id/courses')
    async findCourseByStuId(@Param('id') id: string): Promise<StuResponse> {
      const data = await this.stuService.findCourseByStuId(id);
      return {code: 200, data: data, message: '该学生选课信息查找成功'};
    }
    @Get(':id/classes')
    async findClassByStuId(@Param('id') id: string): Promise<StuResponse> {
        const data = await this.stuService.findClassByStuId(id);
        return {code: 200, data: data, message: '该学生班级信息查找成功'};
    }

    @Get(':id/scores')
    async findScoreByStuId(@Param('id') id: string): Promise<StuResponse> {
        const data = await this.stuService.findScoreByStuId(id);
        return {code: 200, data: data, message: '该学生成绩信息查找成功'};
    }

    @Post()
    async createStu(@Body() createStuDto: CreateStuDto): Promise<StuResponse> {
        const data =await this.stuService.createStu(createStuDto);
        return {code: 200, data: data, message: '添加成功'};
    }
  
    @Delete(':id')
    async deleteStu(@Param('id') id: string): Promise<StuResponse> {
        await this.stuService.deleteStu(id);
        return { code: 200, message: '删除成功' };
    }
  

    @Get(':id')
    async findOneStu(@Param('id') id: string): Promise<StuResponse> {
        const data = await this.stuService.findOneStu(id);
        return {code: 200, data: data, message: '查找成功'};
    }
    
    @Put(':id')
    async updateStu(@Param('id') id: string, @Body() updateStuDto: UpdateStuDto): Promise<StuResponse> {
        await this.stuService.updateStu(id, updateStuDto);
        return { code: 200, message: '更新成功' };
    }
  
  }
  
  