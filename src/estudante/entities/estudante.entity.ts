import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Cidade } from '../../cidade/entities/cidade.entity';
import { ManyToOne } from 'typeorm';
@Entity('estudante')
export class Estudante {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  matricula: string;

  @Column()
  email: string;

  @Column()
  dt_nascimento: string;

  @ManyToOne(() => Cidade, (cidade) => cidade.estudantes)
  cidade: Cidade;

}
