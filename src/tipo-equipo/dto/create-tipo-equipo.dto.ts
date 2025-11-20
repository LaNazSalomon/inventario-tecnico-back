import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoEquipoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}