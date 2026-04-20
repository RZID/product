import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsOptional,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @ApiProperty({ default: 'blub@email.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be a valid email.' })
  email!: string;

  @ApiProperty({ default: 'blub' })
  @IsNotEmpty({ message: 'Username is required.' })
  @IsOptional()
  username: string;

  @ApiProperty({ default: 'Password123!' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @IsStrongPassword({}, { message: 'Password is not strong enough.' })
  password!: string;
}
