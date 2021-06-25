import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, } from 'typeorm';
import { ListAllAdminDto } from '../dtos/admin';
import * as bcrypt from 'bcryptjs';


@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  account: string;

  @Column('text', { nullable: false })
  password: string;

  toResponseObject(): ListAllAdminDto {
    const { id, account, password } = this;
    return { id, account, password };
  }

  @BeforeInsert()
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
