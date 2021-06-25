import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { TcService } from '../services/tc.service';
import { ListAllTcDto, CreateTcDto, UpdateTcDto } from '../dtos/tc';


interface TcResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}   


@Controller('tcs')
export class TcController {
  constructor(
  private readonly tcService: TcService
  ){}
  
  @Get()
  findAllTcs(): Promise<ListAllTcDto[]> {
    return this.tcService.findAllTcs();
  }


  @Post()
  async createTc(@Body() createTcDto: CreateTcDto): Promise<TcResponse> {
      const data =await this.tcService.createTc(createTcDto);
      return {code: 200, data: data, message: '添加成功'};
  }

  @Delete(':id')
  async deleteTc(@Param('id') id: string): Promise<TcResponse> {
      await this.tcService.deleteTc(id);
      return { code: 200, message: '删除成功' };
  }

  @Get(':id')
  async findOneTc(@Param('id') id: string): Promise<TcResponse> {
      const data = await this.tcService.findOneTc(id);
      return {code: 200, data: data, message: '查找成功'};
  }
  
  @Put(':id')
  async updateTc(@Param('id') id: string, @Body() updateTcDto: UpdateTcDto): Promise<TcResponse> {
      await this.tcService.updateTc(id, updateTcDto);
      return { code: 200, message: '更新成功' };
  }

}

