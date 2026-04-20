import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private dbService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const isExists = await this.dbService.product.findFirst({
      where: { name: createProductDto.name },
    });

    if (isExists) {
      throw new ConflictException('Product already exists.');
    }

    return this.dbService.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        category: createProductDto.category,
      },
    });
  }

  async findAll(category?: string) {
    return this.dbService.product.findMany({
      where: category
        ? {
            category: {
              contains: category,
            },
          }
        : {},
    });
  }

  async findOne(id: number) {
    const product = await this.dbService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const isExists = await this.dbService.product.findUnique({
      where: { id },
    });

    if (!isExists) {
      throw new NotFoundException('Product not found');
    }

    return this.dbService.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        price: updateProductDto.price,
        category: updateProductDto.category,
      },
    });
  }

  async remove(id: number) {
    const product = await this.dbService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.dbService.product.delete({
      where: { id },
    });

    return { message: 'Product deleted' };
  }
}
