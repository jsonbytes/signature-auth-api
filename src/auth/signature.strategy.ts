import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class SignatureStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(request: Request): Promise<any> {
    const authPayload = request.body;
    const user = await this.authService.validateSigner(authPayload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
