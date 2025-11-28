import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateModeloEquipoDto {
  @IsString({ message: 'El nombre del modelo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del modelo no puede estar vacío' })
  nombre: string;

  @IsUUID('4', { message: 'El ID de la marca debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID de la marca es obligatorio' })
  marcaId: string;
}
