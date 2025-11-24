import { IsNotEmpty, IsString } from "class-validator";

export class CreateResolucionPantallaDto {
  @IsString()
  @IsNotEmpty()
  resolucion: string;
}
