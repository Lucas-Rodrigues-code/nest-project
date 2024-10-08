import { Prisma, User } from '@prisma/client';
import { UserService } from './../user/user.service';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  async signIn(
    params: Prisma.UserCreateInput,
  ): Promise<{ access_Token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: params.email },
    });
    if (!user) throw new NotFoundException('User not found');

    const passwordMath = await bcrypt.compare(params.password, user.password);
    if (!passwordMath) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id };

    return {
      access_Token: await this.jwtService.signAsync(payload),
    };
  }
}
