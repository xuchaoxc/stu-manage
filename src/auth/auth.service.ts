import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/services/admin.service';

@Injectable()
export class AuthService {
  constructor(
//    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(account: string, password: string): Promise<any> {
//    const admin = await this.adminService.find(account);
    const admin = { account: 'walker123', password: '123321' };
    if (admin && admin.password) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  async login(admin: any): Promise<any> {
    const payload = {username: admin.account, sub: admin.id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
