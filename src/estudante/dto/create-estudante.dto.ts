import { IsString, IsDateString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEstudanteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  matricula: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  dt_nascimento: string;

  @IsInt()
  @IsNotEmpty()
  cidadeId: number;
}
