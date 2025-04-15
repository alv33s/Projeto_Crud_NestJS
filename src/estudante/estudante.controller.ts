import { 
  Controller,
  Get,
  Post,
  Body,
  Patch, 
  Param, 
  Delete, 
  HttpCode 
} from '@nestjs/common';
import { EstudanteService } from './estudante.service';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';




@Controller('estudante')
export class EstudanteController {
  constructor(private readonly estudanteService: EstudanteService) {}

  @Post()
  create(@Body() createEstudanteDto: CreateEstudanteDto) {
    return this.estudanteService.create(createEstudanteDto);
  }

  @Get()
  findAll() {
    return this.estudanteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const estudante = await this.estudanteService.findOne(+id);
    if (!estudante) throw new NotFoundException();
    return estudante;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateEstudanteDto: UpdateEstudanteDto) {
    const estudante = await this.estudanteService.update(
      +id, 
      updateEstudanteDto);
    if (!estudante) throw new NotFoundException();
    return estudante;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const estudante = await this.estudanteService.remove(+id);
    if (!estudante) throw new NotFoundException();
  }
}
