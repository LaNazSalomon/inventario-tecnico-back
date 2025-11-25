import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateModeloProcesadorDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsUUID('4', { message: 'El tipo de procesador debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El tipo de procesador es obligatorio' })
  tipoProcesadorId: string;
}