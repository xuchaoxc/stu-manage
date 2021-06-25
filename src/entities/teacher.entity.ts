import { Clazs } from 'src/entities/clazs.entity';
import { Course } from 'src/entities/course.entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ListAllTeacDto } from '../dtos/teacher';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: 'teac_no', length: 10 ,nullable: false})
  teacNo: string;

  @Column({ name: 'teac_name', length: 30 ,nullable: false})
  teacName: string;

  @Column({ type: 'uuid', name: "course_id" ,nullable: false})
  courseId: string;

  @Column({ name: 'teac_role', length: 10 ,nullable: false})
  teacRole: string;
  //老师授课（多对一）
  @ManyToOne(() => Course,course =>course.teachers)
  @JoinColumn({ name: "course_id" })
  courses: Course;

  //老师带班（多对多）
  @ManyToMany(() => Clazs)
  @JoinTable({
    name: "tc",
    joinColumn: {
      name: "teac_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "class_id",
      referencedColumnName: "id"
    }
  })
  clazses: Clazs[];

/*   @OneToMany(() => Score, score  => score.teachers)
  score: Score[]; */

  toResponseObject(): ListAllTeacDto {
    const { id, teacNo, teacName, courseId, teacRole } = this;
    return { id, teacNo, teacName, courseId, teacRole};
  }
}
