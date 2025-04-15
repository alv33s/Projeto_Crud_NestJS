import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UfService } from './uf.service';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';



@Controller('uf')
export class UfController {
  constructor(private readonly ufService: UfService) {}

  @Post()
  create(@Body() createUfDto: CreateUfDto) {
    return this.ufService.create(createUfDto);
  }

  @Get()
  findAll() {
    return this.ufService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const uf = await this.ufService.findOne(+id);
    if (!uf) throw new NotFoundException();
    return uf;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUfDto: UpdateUfDto){
    const uf = await this.ufService.update(+id, updateUfDto);
    if (!uf) throw new NotFoundException();
    return uf;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const uf = await this.ufService.remove(+id);
    if (!uf) throw new NotFoundException();
  }
}