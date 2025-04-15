import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Estudante } from '../../estudante/entities/estudante.entity';
import { ManyToOne, OneToMany } from 'typeorm';
import { Uf } from '../../uf/entities/uf.entity';



@Entity('cidade')
export class Cidade {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Uf, (uf) => uf.cidades)
  uf: Uf;

  @OneToMany(() => Estudante, (estudante) => estudante.cidade)
  estudantes: Estudante[];

}

