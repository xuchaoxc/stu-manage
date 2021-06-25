import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { CreateStuDto, ListAllStuDto, UpdateStuDto } from '../dtos/student';
//import { CreateScDto, ListAllScDto, UpdateScDto } from 'src/dtos/sc';
//import { Sc } from 'src/entities/sc.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly stuRepository: Repository<Student>,
//    private readonly scRepository: Repository<Sc>,
    private readonly _con: Connection,
  ) {}
    
  //展示全部学生信息
  async findAllStus(): Promise<ListAllStuDto[]> {
    const stus = await this.stuRepository.find();
    return stus.map((stu): ListAllStuDto => stu.toResponseObject());
  }

  //根据学生ID查询选修过的课程
  async findCourseByStuId(id: string): Promise<Student[]> {
    return await this.stuRepository.find({ 
      where: { id: id },
      relations: ['courses'] 
    });
  }

  //根据学生ID查询所属班级信息
  async findClassByStuId(id: string): Promise<Student[]> {
    return await this.stuRepository.find({ 
      where: { id: id },
      relations: ['clazs'] 
    });
  } 

  //根据学生ID查询成绩信息
  async findScoreByStuId(id: string): Promise<Student[]> {
    return await this.stuRepository.find({ 
      where: { id: id },
      relations: ['score'] 
    });
  } 
  //根据学生ID查询指定学生
  async findOneStu(id: string): Promise<ListAllStuDto> {
    return await this.findOneById(id);
} 
  async findOneById(id: string): Promise<ListAllStuDto> {
    return await this.stuRepository.findOne(id);
  }

 
  //添加
  async createStu(params: CreateStuDto): Promise<ListAllStuDto> {
    const { stuNo } = params;
    let stu = await this.stuRepository.findOne({ where: { stuNo } });
    if (stu) {
      throw new HttpException('该学生编号已存在', HttpStatus.BAD_REQUEST);
    }
    stu = await this.stuRepository.create(params);
    await this.stuRepository.save(stu);
    return stu.toResponseObject();
  }


/*   //添加学生选课信息
  async createSc(params: CreateScDto): Promise<ListAllScDto> {
    const { stuId, courseId } = params;
    let sc = await this.scRepository.findOne({ where: { stuId, courseId} });
    if (sc) {
      throw new HttpException('该选课信息已存在', HttpStatus.BAD_REQUEST);
    }
    sc = await this.scRepository.create(params);
    await this.scRepository.save(sc);
    return sc.toResponseObject();
  } */

  //删除学生信息
  async deleteStu(id: string): Promise<void> {
    await this.findOneById(id);
    await this.stuRepository.delete(id);
  }


  //删除学生选课信息
/*   async deleteSc(id: string): Promise<void> {
    await this.findCourseByStuId(id);
    await this.scRepository.delete(id);
  } */

  //修改学生信息
  async updateStu(id: string, data: UpdateStuDto): Promise<void> {
    await this.findOneById(id);
    await this.stuRepository.update(id, data);
  }

  //修改学生选课
/*   async updateSc(id: string, data: UpdateScDto): Promise<void> {
    await this.findCourseByStuId(id);
    await this.scRepository.update(id, data);
  } */
}
