import { ListAllTcDto } from 'src/dtos/tc';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column, } from 'typeorm';
import { Clazs } from './clazs.entity';
import { Teacher } from './teacher.entity';


@Entity()
export class Tc {
  @Column('uuid')
  id: string;

  @PrimaryColumn({ type: 'uuid', name: 'teac_id' })
  teacId: string;

  @PrimaryColumn({ type: 'uuid', name: 'class_id' })
  classId: string;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teac_id' })
  teacher: Teacher;  

  @ManyToOne(() => Clazs)
  @JoinColumn({ name: 'class_id' })
  clazs: Clazs;

  toResponseObject(): ListAllTcDto {
    const { id, teacId, classId } = this;
    return { id, teacId, classId };
  }
}
