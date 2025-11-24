import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoAlmacenamientoExtraibleDto {
  @IsString()
  @IsNotEmpty()
  tipo: string; // Ej: USB, SD, etc.
}