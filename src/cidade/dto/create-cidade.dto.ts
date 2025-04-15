import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCidadeDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @IsNotEmpty()
  ufId: number;
}
