import { ListAllScDto } from 'src/dtos/sc';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column, } from 'typeorm';
import { Course } from './course.entity';
import { Student } from './student.entity';


@Entity()
export class Sc {
  @Column('uuid')
  id: string;

  @PrimaryColumn({ type: 'uuid', name: 'stu_id' })
  stuId: string;

  @PrimaryColumn({ type: 'uuid', name: 'course_id' })
  courseId: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'stu_id' })
  student: Student;  

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  toResponseObject(): ListAllScDto {
    const { id, stuId, courseId } = this;
    return { id, stuId, courseId };
  }
}
