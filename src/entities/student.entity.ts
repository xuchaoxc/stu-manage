import { Clazs } from 'src/entities/clazs.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ListAllStuDto } from '../dtos/student';
import { Course } from './course.entity';
import { Score } from './score.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'stu_no',nullable: false })
  stuNo: string;

  @Column({ name: 'stu_name' })
  stuName: string;
 
  @Column({ length: 30 })
  gender: string;

  @Column({ type: 'uuid', name: 'class_id'})
  classId: string;


  //班级学生（多对一）
  @ManyToOne(() => Clazs)
  @JoinColumn({ name: 'class_id' })
  clazs: Clazs;

  //学生成绩（一对多）
  @OneToMany(() => Score, score => score.student)
  score: Score[];

  //学生选课（多对多）
  @ManyToMany(() => Course)
  @JoinTable({
    name: "sc",
    joinColumn: {
      name: "stu_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "course_id",
      referencedColumnName: "id"
    }
  })
  courses: Course[];

  toResponseObject(): ListAllStuDto {
    const { id, stuNo, stuName, gender, classId} = this;
    return { id, stuNo, stuName, gender, classId};
  }

}
