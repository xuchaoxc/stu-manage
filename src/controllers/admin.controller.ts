import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { ListAllAdminDto, RegisterDto, UpdateAdminDto } from '../dtos/admin';


interface AdminResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}   


@Controller('admins')
export class AdminController {
  constructor(
  private readonly adminService: AdminService
  ){}
  
  @Get()
  findAllAdmins(): Promise<ListAllAdminDto[]> {
    return this.adminService.findAllAdmins();
  }

  @Post('registers')
  async register(@Body() regestDto: RegisterDto): Promise<AdminResponse>  {
    const data = await this.adminService.register(regestDto);
    return {code: 200, data: data, message: '注册成功'};
  }

  @Post('logins')
  async login(@Body() login: RegisterDto): Promise<AdminResponse> {
    const data = await this.adminService.login(login);
    return {code: 200, data: data, message: '登录成功'};
  }

  @Post()
  async createAdmin(@Body() registerDto: RegisterDto): Promise<AdminResponse> {
      const data =await this.adminService.createAdmin(registerDto);
      return {code: 200, data: data, message: '添加成功'};
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string): Promise<AdminResponse> {
      await this.adminService.deleteAdmin(id);
      return { code: 200, message: '删除成功' };
  }

  @Get(':id')
  async findOneAdmin(@Param('id') id: string): Promise<AdminResponse> {
      const data = await this.adminService.findOneAdmin(id);
      return {code: 200, data: data, message: '查找成功'};
  }
  
  @Put(':id')
  async updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto): Promise<AdminResponse> {
      await this.adminService.updateAdmin(id, updateAdminDto);
      return { code: 200, message: '更新成功' };
  }

}

