import { IsNotEmpty, IsString } from "class-validator";

export class CreateTamanoPantallaDto {
  @IsString()
  @IsNotEmpty()
  pulgadas: string;
}
