import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoProcesadorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}