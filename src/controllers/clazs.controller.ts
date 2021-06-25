import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClassesPageDto, ClassesPageOptionsDto, CreateClazsDto, ListAllClazsDto, UpdateClazsDto} from '../dtos/clazs';
import { ClazsService } from '../services/clazs.service';

interface ClazsResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
} 

@Controller('classes')
export class ClazsController {
  constructor(
    private readonly clazsService: ClazsService
    ){}
    
    @Get()
    async findAllClasses(): Promise<ListAllClazsDto[]> {
      return await this.clazsService.findAllClazses();
    }

    @Get('test')
    async testFindAllClasses(
      pageOptionsDto: ClassesPageOptionsDto
      ): Promise<ClassesPageDto| undefined | undefined | unknown> {
      return await this.clazsService.testFindAllClazses(pageOptionsDto);
    }


    @Get(':id/students')
    async findStuByClassId(@Param('id') id: string): Promise<ClazsResponse> {
        const data = await this.clazsService.findStuByClassId(id);
        return {code: 200, data: data, message: '该班级学生信息查找成功'};
    }

    @Get(':id/teachers')
    async findTeacByClassId(@Param('id') id: string): Promise<ClazsResponse> {
        const data = await this.clazsService.findTeacByClassId(id);
        return {code: 200, data: data, message: '该班级带班老师信息查找成功'};
    }

    @Get(':id/scores/:id')
    async findScoreByClassIdCourseId(@Param('id') id: string,@Param('id') id2: string): Promise<ClazsResponse> {
        const data = await this.clazsService.findScoreByClassIdCourseId(id,id2);
        return {code: 200, data: data, message: '该班级学生指定课程成绩信息查找成功'};
    }

    @Post()
    async createClass(@Body() createClazsDto: CreateClazsDto): Promise<ClazsResponse> {
        const data =await this.clazsService.createClazs(createClazsDto);
        return {code: 200, data: data, message: '添加成功'};
    }
  
    @Delete(':id')
    async deleteClass(@Param('id') id: string): Promise<ClazsResponse> {
        await this.clazsService.deleteClazs(id);
        return { code: 200, message: '删除成功' };
    }
  
    @Get(':id')
    async findOneClass(@Param('id') id: string): Promise<ClazsResponse> {
        const data = await this.clazsService.findOneClazs(id);
        return {code: 200, data: data, message: '查找成功'};
    }
    
    @Put(':id')
    async updateClass(@Param('id') id: string, @Body() updateClazsDto: UpdateClazsDto): Promise<ClazsResponse> {
        await this.clazsService.updateClazs(id, updateClazsDto);
        return { code: 200, message: '更新成功' };
    }
  
  }
  
  