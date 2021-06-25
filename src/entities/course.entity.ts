import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ListAllCourseDto } from '../dtos/course';
import { Score } from './score.entity';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'course_no' })
  courseNo: string;

  @Column({ name: 'course_name' })
  courseName: string;

  @Column({ name: 'course_intro' })
  courseIntro: string;

  //课程成绩（一对多）
  @OneToMany(() => Score, score => score.courses)
  score: Score[];

  //课程老师（一对多）
  @OneToMany(() => Teacher, teacher => teacher.courses)
  teachers: Teacher[];


  //学生选课（多对多）
  @ManyToMany(() => Student)
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
  students: Student[];

  toResponseObject(): ListAllCourseDto {
    const { id, courseNo, courseName, courseIntro} = this;
    return { id, courseNo, courseName, courseIntro};
  }
}
