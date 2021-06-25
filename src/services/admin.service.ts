import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { RegisterDto, ListAllAdminDto } from '../dtos/admin';

@Injectable()
export class AdminService {
  private readonly admins: Admin[];
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

  ) {}
 


  //展示全部管理员信息
  async findAllAdmins(): Promise<ListAllAdminDto[]> {
    const admins = await this.adminRepository.find();
    return admins.map((admin): ListAllAdminDto => admin.toResponseObject());
  }

  //管理员信息注册
  async register(data: RegisterDto): Promise<ListAllAdminDto> {
    const { account } = data;
    let admin = await this.adminRepository.findOne({ where: { account } });
    if (admin) {
      throw new HttpException(
        '该用户已存在',
        HttpStatus.BAD_REQUEST,
      );
    }
    admin = await this.adminRepository.create(data);
    await this.adminRepository.save(admin);
    return  admin.toResponseObject();
  }
  
  //管理员登陆
  async login(data: RegisterDto): Promise<ListAllAdminDto>  {
    const { account, password } = data;
    const admin = await this.adminRepository.findOne({ where: { account } });
    if (!admin || !(await admin.comparePassword(password))) {
      throw new HttpException(
        '账号或密码错误',
        HttpStatus.BAD_REQUEST,
      );
    }
    return admin.toResponseObject();
  }


  //根据ID查询
  async findOneAdmin(id: string): Promise<ListAllAdminDto> {
    return await this.findOneById(id);
} 
  async findOneById(id: string): Promise<ListAllAdminDto> {
    return await this.adminRepository.findOne(id);
  }

  
  //添加
  async createAdmin(data: RegisterDto): Promise<ListAllAdminDto> {
    return await this.adminRepository.save(data);
  }

  //删除
  async deleteAdmin(id: string): Promise<void> {
    await this.findOneById(id);
    await this.adminRepository.delete(id);
  }
  //修改
  async updateAdmin(id: string, data: RegisterDto): Promise<void> {
    await this.findOneById(id);
    await this.adminRepository.update(id, data);
  }


}

