import { IsNotEmpty, IsString } from "class-validator";

export class CreateEstadoFuncionamientoDto {
  @IsString()
  @IsNotEmpty()
  estado: string;
}