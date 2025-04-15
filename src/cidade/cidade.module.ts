import { Module } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CidadeController } from './cidade.controller';
import { Cidade } from './entities/cidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uf } from '../uf/entities/uf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cidade, Uf])],
  controllers: [CidadeController],
  providers: [CidadeService],
})
export class CidadeModule {}
