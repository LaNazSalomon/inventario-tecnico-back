import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoPantallaDto {
  @IsString({ message: 'El tipo de pantalla debe ser un texto válido.' })
  @IsNotEmpty({ message: 'El tipo de pantalla es obligatorio.' })
  tipo: string;
}