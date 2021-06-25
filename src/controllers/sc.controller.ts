import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ScService } from '../services/sc.service';
import { ListAllScDto, CreateScDto, UpdateScDto } from '../dtos/sc';


interface ScResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}   


@Controller('scs')
export class ScController {
  constructor(
  private readonly scService: ScService
  ){}
  
  @Get()
  findAllAdmins(): Promise<ListAllScDto[]> {
    return this.scService.findAllScs();
  }


  @Post()
  async createSc(@Body() registerDto: CreateScDto): Promise<ScResponse> {
      const data =await this.scService.createSc(registerDto);
      return {code: 200, data: data, message: '添加成功'};
  }

  @Delete(':id')
  async deleteSc(@Param('id') id: string): Promise<ScResponse> {
      await this.scService.deleteSc(id);
      return { code: 200, message: '删除成功' };
  }

  @Get(':id')
  async findOneSc(@Param('id') id: string): Promise<ScResponse> {
      const data = await this.scService.findOneSc(id);
      return {code: 200, data: data, message: '查找成功'};
  }
  
  @Put(':id')
  async updateSc(@Param('id') id: string, @Body() updateScDto: UpdateScDto): Promise<ScResponse> {
      await this.scService.updateSc(id, updateScDto);
      return { code: 200, message: '更新成功' };
  }

}

