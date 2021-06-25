import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';
import { CreateTeacDto, ListAllTeacDto, UpdateTeacDto } from '../dtos/teacher';
import { Course } from 'src/entities/course.entity';
import { Score } from 'src/entities/score.entity';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher)
        readonly teacRepository: Repository<Teacher>,
        private readonly _con: Connection,
      ) {}
    
  //展示全部老师信息
  async findAllTeacs(): Promise<ListAllTeacDto[]> {
    const teacs = await this.teacRepository.find();
    return teacs.map((teac): ListAllTeacDto => teac.toResponseObject());
  }
  //根据ID查询角色
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findTeacRole(id: string){
    const role = await getConnection()
      .createQueryBuilder(Teacher,'teacher')
      .select("teacher.teacRole")
      .where("teacher.id = :id", {id: id})
      .getOne();
    return role;
} 

  //根据ID查询
  async findOneTeac(id: string): Promise<ListAllTeacDto> {
    return await this.findOneById(id);
} 
  async findOneById(id: string): Promise<ListAllTeacDto> {
    return await this.teacRepository.findOne(id);
  }

  //查询老师所授课程的全部信息
  async findCourseByTeacId(id: string): Promise<Teacher[]> {
    return await this.teacRepository.find({ 
      where: { id: id },
      relations: ['courses'] 
    });
  } 

  //查询老师所带的全部班级信息
  async findClassByTeacId(id: string): Promise<Teacher[]> {
    return await this.teacRepository.find({ 
      where: { id: id },
      relations: ['clazses'] 
    });
  }

  //查询老师所授课程的成绩信息
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findScoreByTeacId(id: string){
    const posts = await getConnection()
       .createQueryBuilder(Score,'score')
       .select(["score.courseId", "score.stuId", "score.score"])
       .leftJoinAndSelect(Course,'course','course.id=score.courseId')
       .addSelect(subQuery => {
        return subQuery
          .select("teacher.courseId","courseId")
          .from(Teacher, "teacher")
          .where("teacher.id = :id", {id: id})
        }, "courseId")
       .getMany();
       console.log(posts);
    return posts;

  }

  //添加教师信息
  async createTeac(params: CreateTeacDto): Promise<ListAllTeacDto> {
    const { teacNo } = params;
    let teac = await this.teacRepository.findOne({ where: { teacNo } });
    if (teac) {
      throw new HttpException('该编号已存在', HttpStatus.BAD_REQUEST);
    }
    teac = await this.teacRepository.create(params);
    await this.teacRepository.save(teac);
    return teac.toResponseObject();
  }


  //删除教师信息
  async deleteTeac(id: string): Promise<void> {
    await this.findOneById(id);
    await this.teacRepository.delete(id);
  }


  //修改教师信息
  async updateTeac(id: string, data: UpdateTeacDto): Promise<void> {
    await this.findOneById(id);
    await this.teacRepository.update(id, data);
  }


}
