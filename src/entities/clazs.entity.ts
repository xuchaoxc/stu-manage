import { Student } from 'src/entities/student.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ListAllClazsDto } from '../dtos/clazs';
import { Teacher } from './teacher.entity';

@Entity()
export class Clazs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'class_no',nullable: true})
  classNo: string;
 
  @Column({ name: 'class_name'})
  className: string;

  @Column({name: 'class_date'})
  classDate: Date;
  
  //班级学生信息（一对多）
  @OneToMany(() => Student, student => student.clazs)
  students: Student[];

  //老师带班（多对多）
  @ManyToMany(() => Teacher)
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
  teachers: Teacher[];

   toResponseObject(): ListAllClazsDto {
    const { id, classNo, className, classDate } = this;
    return { id, classNo, className, classDate};
  }
  
}