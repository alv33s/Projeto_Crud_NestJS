import { Module } from '@nestjs/common';
import { EstudanteService } from './estudante.service';
import { EstudanteController } from './estudante.controller';

@Module({
  controllers: [EstudanteController],
  providers: [EstudanteService],
})
export class EstudanteModule {}
