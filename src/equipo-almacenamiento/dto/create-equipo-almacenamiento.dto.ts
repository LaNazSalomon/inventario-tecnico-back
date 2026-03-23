import { IsString, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { TipoEquipoAlmacenamiento } from '../enums/tipo-equipo-almacenamiento.enum';

export class CreateEquipoAlmacenamientoDto {
  @IsOptional()
  @IsString({ message: 'El número de inventario debe ser un texto válido.' })
  inventario?: string;

  @IsOptional()
  @IsString({ message: 'El número de serie debe ser un texto válido.' })
  serie?: string;

  @IsString({
    message:
      'La capacidad de almacenamiento debe ser un texto válido (ej. "1TB", "500GB").',
  })
  capacidadAlmacenamiento: string;

  // Relaciones (IDs como UUID)
  @IsUUID('4', { message: 'El usuario_id debe ser un UUID válido.' })
  usuarioId: string;

  @IsUUID('4', {
    message: 'El marca_equipo_almacenamiento_id debe ser un UUID válido.',
  })
  marcaEquipoAlmacenamientoId: string;

  @IsUUID('4', {
    message: 'El modelo_equipo_almacenamiento_id debe ser un UUID válido.',
  })
  modeloEquipoAlmacenamientoId: string;

  @IsUUID('4', {
    message: 'El estado_funcionamiento_id debe ser un UUID válido.',
  })
  estadoFuncionamientoId: string;

  @IsEnum(TipoEquipoAlmacenamiento, {
    message: `El tipo de equipo de almacenamiento debe ser uno de los siguientes valores: ${Object.values(TipoEquipoAlmacenamiento).join(', ')}`,
  })
  tipoEquipoAlmacenamiento: TipoEquipoAlmacenamiento;

  @IsUUID('4', { message: 'El departamento debe ser un UUID válido.' })
  idDepartamento: string;

  @IsUUID('4', { message: 'La unidad académica debe ser un UUID válido.' })
  idUnidadAcademica: string;
}
