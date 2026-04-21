import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const token = await this.authService.login(req.user);

    return {
      success: true,
      message: 'Login successful',
      data: token,
    };
  }

  @Post('logout')
  logout() {
    return { message: 'Logged out' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  profile(@Request() req) {
    return this.authService.profile(req.user.userId);
  }

  // @Post('dashboard')
  // @UseGuards(AuthGuard('jwt'))
  // dashboard(@Body() dto: )
}
