import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudanteModule } from './estudante/estudante.module';
import { CidadeModule } from './cidade/cidade.module';
import { UfModule } from './uf/uf.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EstudanteModule, CidadeModule, UfModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
