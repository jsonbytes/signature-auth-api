import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth-payload.dto';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateSigner(authPayload: AuthPayload): Promise<any> {
    const { message, signature } = authPayload;
    const [, , username] = message.split('.');
    const verifySigner = ethers.recoverAddress(
      ethers.hashMessage(message),
      signature,
    );
    const user = await this.usersService.findOne(username);
    if (user && user.address === verifySigner) {
      return user;
    }
    return null;
  }

  async loginSigner(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
