import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoPantallaDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;
}