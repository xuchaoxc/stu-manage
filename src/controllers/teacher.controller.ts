import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTeacDto, ListAllTeacDto, UpdateTeacDto} from '../dtos/teacher';
import { TeacherService } from '../services/teacher.service';

interface TeacResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
} 

@Controller('teachers')
export class TeacherController {
  constructor(
    private readonly teacService: TeacherService
    ){}
    
    @Get()
    findAllTeacs(): Promise<ListAllTeacDto[]> {
      return this.teacService.findAllTeacs();
    }
  
    @Get(':id/courses')
    async findCourseByTeacId(@Param('id') id: string): Promise<TeacResponse> {
        const data = await this.teacService.findCourseByTeacId(id);
        return {code: 200, data: data, message: '所授课程信息查找成功'};
    }

    @Get(':id/classes')
    async findClassByTeacId(@Param('id') id: string): Promise<TeacResponse> {
        const data = await this.teacService.findClassByTeacId(id);
        return {code: 200, data: data, message: '所带班级信息查找成功'};
    }
    
    @Get(':id/scores')
    async findScoreByTeacId(@Param('id') id: string): Promise<TeacResponse> {
        const data = await this.teacService.findScoreByTeacId(id);
        return {code: 200, data: data, message: '所授课程成绩信息查找成功'};
    }
    @Post()
    async createTeac(@Body() createTeacDto: CreateTeacDto): Promise<TeacResponse> {
        const data =await this.teacService.createTeac(createTeacDto);
        return {code: 200, data: data, message: '添加成功'};
    }
    
  
    @Delete(':id')
    async deleteTeac(@Param('id') id: string): Promise<TeacResponse> {
        await this.teacService.deleteTeac(id);
        return { code: 200, message: '删除成功' };
    }
  
    @Get(':id')
    async findOneTeac(@Param('id') id: string): Promise<TeacResponse> {
        const data = await this.teacService.findOneTeac(id);
        return {code: 200, data: data, message: '查找成功'};
    }
    
    @Put(':id')
    async updateTeac(@Param('id') id: string, @Body() updateTeacDto: UpdateTeacDto): Promise<TeacResponse> {
        await this.teacService.updateTeac(id, updateTeacDto);
        return { code: 200, message: '更新成功' };
    }
  
  }
  
  