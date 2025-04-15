import { 
  Controller,
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';


@Controller('cidade')
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @Post()
  create(@Body() createCidadeDto: CreateCidadeDto) {
    return this.cidadeService.create(createCidadeDto);
  }

  @Get()
  findAll() {
    return this.cidadeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cidade = await this.cidadeService.findOne(+id);
    if (!cidade) throw new NotFoundException();
    return cidade;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCidadeDto: UpdateCidadeDto) 
  {
    const cidade = await this.cidadeService.update(+id, updateCidadeDto);
    if (!cidade) throw new NotFoundException();
    return cidade;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const cidade = await this.cidadeService.remove(+id);
    if (!cidade) throw new NotFoundException();
  }
}
