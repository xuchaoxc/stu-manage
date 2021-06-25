import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tc } from '../entities/tc.entity';
import { UpdateTcDto,CreateTcDto, ListAllTcDto } from '../dtos/tc';
import { TeacherService } from '../services/teacher.service';

@Injectable()
export class TcService {
  private readonly tcs: Tc[];
  constructor(
    @InjectRepository(Tc)
    private readonly tcRepository: Repository<Tc>,

  ) {}
 


  //展示全部老师带班信息
  async findAllTcs(): Promise<ListAllTcDto[]> {
    const tc = await this.tcRepository.find();
    return tc.map((tc): ListAllTcDto => tc.toResponseObject());
  }

  //添加老师带班信息
  async createTc(params: CreateTcDto): Promise<ListAllTcDto> {
    const { teacId, classId } = params;
    let tc = await this.tcRepository.findOne({ where: { teacId, classId} });
//    let role=await teacRepository: TeacherService.findRole;
    if (tc) {
      throw new HttpException('带班信息已存在', HttpStatus.BAD_REQUEST);
    }
    tc = await this.tcRepository.create(params);
    await this.tcRepository.save(tc);
    return tc.toResponseObject();
  } 

  //根据ID查询
  async findOneTc(stuId: string): Promise<ListAllTcDto> {
    return await this.findOneById(stuId);
} 
  async findOneById(stuId: string): Promise<ListAllTcDto> {
    return await this.tcRepository.findOne(stuId);
  }


  //删除
  async deleteTc(id: string): Promise<void> {
    await this.findOneById(id);
    await this.tcRepository.delete(id);
  }
  //修改
  async updateTc(id: string, data: UpdateTcDto): Promise<void> {
    await this.findOneById(id);
    await this.tcRepository.update(id, data);
  }


}

