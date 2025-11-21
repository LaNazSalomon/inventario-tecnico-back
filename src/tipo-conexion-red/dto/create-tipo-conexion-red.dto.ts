import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoConexionRedDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;
}