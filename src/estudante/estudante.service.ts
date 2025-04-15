import { Injectable } from '@nestjs/common';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';
import { Repository } from 'typeorm';
import { Estudante } from './entities/estudante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cidade } from '../cidade/entities/cidade.entity';




@Injectable()
export class EstudanteService {
  constructor(
    @InjectRepository(Estudante)
    private readonly repository: Repository<Estudante>,

    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
  ) {}

  async create(dto: CreateEstudanteDto) {
    const cidade = await this.cidadeRepository.findOneBy({ id: dto.cidadeId });
    if (!cidade) throw new Error('Cidade não encontrada');

    const estudante = this.repository.create({
      ...dto,
      cidade
    });

    return this.repository.save(estudante);
  }

  findAll() {
    return this.repository.find({
      relations: ['cidade']
    });
  }

  findOne(id: number) {
    return this.repository.find({
      where: { id },
      relations: ['cidade']
    });
  }

  async update(id: number, dto: UpdateEstudanteDto) {
    const estudante = await this.repository.findOneBy({ id });
    if (!estudante) return null;

    if (dto.cidadeId) {
      const cidade = await this.cidadeRepository.findOneBy({
        id: dto.cidadeId, 
      });
      if (!cidade) throw new Error('Cidade não encontrada');
      estudante.cidade = cidade;
    }

    this.repository.merge(estudante, dto);
    return this.repository.save(estudante);
  }

  async remove(id: number) {
    const estudante = await this.repository.findOneBy({ id });
    if (!estudante) return null;
    return this.repository.remove(estudante);
  }
}
