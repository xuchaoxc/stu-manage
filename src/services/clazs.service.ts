import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Clazs } from '../entities/clazs.entity';
import { ClassesPageDto, ClassesPageOptionsDto, CreateClazsDto, ListAllClazsDto, UpdateClazsDto } from '../dtos/clazs';
import { Score } from 'src/entities/score.entity';
import { Course } from 'src/entities/course.entity';
import { Student } from 'src/entities/student.entity';
import { PageMetaDto } from 'src/common/dtos';

@Injectable()
export class ClazsService {
  constructor(
    @InjectRepository(Clazs)
    private readonly clazsRepository: Repository<Clazs>,
  ) {}
    
  //展示全部班级信息
  async findAllClazses(): Promise<ListAllClazsDto[]> {
    const calzses = await this.clazsRepository.find();
    return calzses.map((clazs): ListAllClazsDto => clazs.toResponseObject());
  }
  async testFindAllClazses(
    pageOptionsDto: ClassesPageOptionsDto,
    ): Promise<ClassesPageOptionsDto | undefined> {
    const queryBuilder = this.clazsRepository.createQueryBuilder('clazs');
    const [classes, classesCount] = await queryBuilder
      .select(["clazs.id", "clazs.classNo", "clazs.className", "clazs.classDate"])
      .from(Clazs,'clazs')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: classesCount,
    });
    return new ClassesPageDto(classes, pageMetaDto);
  }


  //根据班级ID查询查询指定班级信息
  async findOneClazs(id: string): Promise<ListAllClazsDto> {
    return await this.findOneById(id);
} 
  async findOneById(id: string): Promise<ListAllClazsDto> {
    return await this.clazsRepository.findOne(id);
  }

  //根据班级ID查询班级全部学生信息
  async findStuByClassId(id: string): Promise<Clazs[]> {
    return await this.clazsRepository.find({ 
      where: { id: id },
      relations: ['students'] 
    });
  } 

  //根据班级ID查询班级全部学生信息
  async findTeacByClassId(id: string): Promise<Clazs[]> {
    return await this.clazsRepository.find({ 
      where: { id: id },
      relations: ['teachers'] 
    });
  }

  //根据班级ID查询班级某门课程全部成绩信息
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findScoreByClassIdCourseId(classid: string, courseid: string){
    const posts = await getConnection()
      .createQueryBuilder(Score,'score')
      .select(["score.courseId", "score.stuId", "score.score"])
      .leftJoinAndSelect(Course,'course','course.id=score.courseId')
      .addSelect(subQuery => {
        return subQuery
          .select("student.id","id")
          .from(Student, "student")
          .where("student.classId = :classId", {id: classid})
        }, "id")
      .where("course.id = :id", {id: courseid})
      .getMany();
    console.log(posts);
    return posts;

  }
  //添加
  async createClazs(params: CreateClazsDto): Promise<ListAllClazsDto> {
    const { classNo } = params;
    let cla = await this.clazsRepository.findOne({ where: { classNo } });
    if (cla) {
      throw new HttpException('该班级编号已存在', HttpStatus.BAD_REQUEST);
    }
    cla = await this.clazsRepository.create(params);
    await this.clazsRepository.save(cla);
    return cla.toResponseObject();
  }

  //删除
  async deleteClazs(id: string): Promise<void> {
    await this.findOneById(id);
    await this.clazsRepository.delete(id);
  }
  //修改
  async updateClazs(id: string, data: UpdateClazsDto): Promise<void> {
    await this.findOneById(id);
    await this.clazsRepository.update(id, data);
  }


}
