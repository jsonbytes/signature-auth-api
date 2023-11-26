import { Injectable } from '@nestjs/common';
import { userData } from './users';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = userData;
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
