import {
  ConflictException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private dbService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.dbService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ConflictException('Invalid credentials.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ConflictException('Invalid credentials.');
    }

    return user;
  }

  login(user: any) {
    return {
      access_token: this.jwtService.sign(
        {
          sub: user.id,
          email: user.email,
        },
        {
          expiresIn: '1h',
        },
      ),
    };
  }

  async register(authDto: AuthDto) {
    // if (!authDto.username) {
    //   throw new BadRequestException('Username is required');
    // }

    const existingUser = await this.dbService.user.findUnique({
      where: { email: authDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists!');
    }

    const hashPassword = await bcrypt.hash(authDto.password, 10);

    return this.dbService.user.create({
      data: {
        email: authDto.email,
        name: authDto.username, // match Prisma
        password: hashPassword,
      },
    });
  }

  async profile(userId: number) {
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    return user;
  }
}
