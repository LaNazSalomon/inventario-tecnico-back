import { IsNotEmpty, IsString } from "class-validator";

export class CreateMarcaEquipoDto {
  @IsString({message: 'El nombre de la marca tiene que ser texto'})
  @IsNotEmpty({message: 'El nombre de la marca es obligatoria'})
  nombre: string;
}