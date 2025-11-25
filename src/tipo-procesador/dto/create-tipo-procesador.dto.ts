import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoProcesadorDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;
}