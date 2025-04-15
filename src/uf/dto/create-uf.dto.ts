import { IsString, IsNotEmpty } from 'class-validator';
export class CreateUfDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  sigla: string;
}
