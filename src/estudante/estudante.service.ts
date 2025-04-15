import { Injectable } from '@nestjs/common';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';

@Injectable()
export class EstudanteService {
  create(createEstudanteDto: CreateEstudanteDto) {
    return 'This action adds a new estudante';
  }

  findAll() {
    return `This action returns all estudante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudante`;
  }

  update(id: number, updateEstudanteDto: UpdateEstudanteDto) {
    return `This action updates a #${id} estudante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudante`;
  }
}
