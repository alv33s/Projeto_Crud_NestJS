import { Injectable } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Uf } from '../uf/entities/uf.entity';

@Injectable()
export class CidadeService {
  constructor(
    @InjectRepository(Cidade)
    private readonly repository: Repository<Cidade>,

    @InjectRepository(Uf)
    private readonly ufRepository: Repository<Uf>,
  ) {}

  async create(dto: CreateCidadeDto) {
    const uf = await this.ufRepository.findOneBy({ id: dto.ufId });
    if (!uf) throw new Error('UF não encontrada');

    const cidade = this.repository.create({
      nome: dto.nome,
      uf
    });

    return this.repository.save(cidade);
  }

  findAll() {
    return this.repository.find({ relations: ['uf'] });
  }

  findOne(id: number) {
    return this.repository.find({
      where: { id },
      relations: ['uf']
    });
  }

  async update(id: number, dto: UpdateCidadeDto) {
    const cidade = await this.repository.findOneBy({ id });
    if (!cidade) return null;

    if (dto.ufId) {
      const uf = await this.ufRepository.findOneBy({ id: dto.ufId });
      if (!uf) throw new Error('UF não encontrada');
      cidade.uf = uf;
    }

    this.repository.merge(cidade, dto);
    return this.repository.save(cidade);
  }

  async remove(id: number) {
    const cidade = await this.repository.findOneBy({ id });
    if (!cidade) return null;
    return this.repository.remove(cidade);
  }
}
