import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateModeloEquipoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsUUID()
  @IsNotEmpty()
  marcaId: string;
}