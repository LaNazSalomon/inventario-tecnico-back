import { IsNotEmpty, IsString } from "class-validator";

export class CreateArquitecturaSoDto {
  @IsString()
  @IsNotEmpty()
  arquitectura: string;
}