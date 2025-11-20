import { IsNotEmpty, IsString } from "class-validator";

export class CreateSistemaOperativoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}