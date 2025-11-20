import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateModeloProcesadorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsUUID()
  @IsNotEmpty()
  tipoProcesadorId: string;
}