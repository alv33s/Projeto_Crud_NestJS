import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Cidade } from '../../cidade/entities/cidade.entity';
import { OneToMany } from 'typeorm';

@Entity('uf')
export class Uf {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sigla: string;

  @OneToMany(() => Cidade, (cidade) => cidade.uf)
  cidades: Cidade[];

}
