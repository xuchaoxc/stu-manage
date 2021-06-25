import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sc } from '../entities/Sc.entity';
import { UpdateScDto,CreateScDto, ListAllScDto } from '../dtos/sc';

@Injectable()
export class ScService {
  private readonly scs: Sc[];
  constructor(
    @InjectRepository(Sc)
    private readonly scRepository: Repository<Sc>,

  ) {}
 


  //展示全部学生选课信息
  async findAllScs(): Promise<ListAllScDto[]> {
    const sc = await this.scRepository.find({relations: ['student'],loadRelationIds: true});
    return sc.map((sc): ListAllScDto => sc.toResponseObject());
  }

  //添加学生选课信息
  async createSc(params: CreateScDto): Promise<ListAllScDto> {
    const { stuId, courseId } = params;
    let sc = await this.scRepository.findOne({ where: { stuId, courseId} });
    if (sc) {
      throw new HttpException('该选课信息已存在', HttpStatus.BAD_REQUEST);
    }
    sc = await this.scRepository.create(params);
    await this.scRepository.save(sc);
    return sc.toResponseObject();
  } 

  //根据ID查询
  async findOneSc(stuId: string): Promise<ListAllScDto> {
    return await this.findOneById(stuId);
} 
  async findOneById(stuId: string): Promise<ListAllScDto> {
    return await this.scRepository.findOne(stuId);
  }


  //删除
  async deleteSc(id: string): Promise<void> {
    await this.findOneById(id);
    await this.scRepository.delete(id);
  }
  //修改
  async updateSc(id: string, data: UpdateScDto): Promise<void> {
    await this.findOneById(id);
    await this.scRepository.update(id, data);
  }


}

