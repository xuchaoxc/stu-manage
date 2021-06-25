import { ListAllScoreDto } from 'src/dtos/score';
import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { Student } from './student.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({type:'uuid',name: 'stu_id'})
  stuId: string;

  @Column({type:'uuid',name: 'course_id'})
  courseId: string;

  @Column()
  score: number;
  
  
  @ManyToOne(() => Student, student => student.score)
  @JoinColumn({ name: 'stu_id' })
  student: Student;

  @ManyToOne(() => Course, course => course.score)
  @JoinColumn({ name: 'course_id' })
  courses: Course;

/*   @ManyToOne(() => Teacher, teacher => teacher.score)
  @JoinColumn()
  teachers: Teacher[]; */

  toResponseObject(): ListAllScoreDto {
    const { id, stuId, courseId, score} = this;
    return { id, stuId, courseId, score};
  }
}
