import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ default: 'TV' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ default: 'Electronics' })
  @IsNotEmpty()
  @IsString()
  category!: string;

  @ApiProperty({ default: 1000000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;
}
