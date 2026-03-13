import { IsString, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { TipoEquipoEnergia } from '../enums/tipo-equipo-energia.enum';

export class CreateEquipoEnergiaDto {
  @IsOptional()
  @IsString({ message: 'El número de inventario debe ser un texto válido.' })
  inventario?: string;

  @IsOptional()
  @IsString({ message: 'El número de serie debe ser un texto válido.' })
  serie?: string;

  // Relaciones (IDs como UUID)
  @IsUUID('4', { message: 'El usuario_id debe ser un UUID válido.' })
  usuarioId: string;

  @IsUUID('4', {
    message: 'El marca_equipo_energia_id debe ser un UUID válido.',
  })
  marcaEquipoEnergiaId: string;

  @IsUUID('4', {
    message: 'El modelo_equipo_energia_id debe ser un UUID válido.',
  })
  modeloEquipoEnergiaId: string;

  @IsUUID('4', {
    message: 'El estado_funcionamiento_id debe ser un UUID válido.',
  })
  estadoFuncionamientoId: string;

  @IsUUID('4', { message: 'El departamento debe ser un UUID válido.' })
  idDepartamento: string;

  @IsUUID('4', { message: 'La unidad académica debe ser un UUID válido.' })
  idUnidadAcademica: string;

  @IsEnum(TipoEquipoEnergia, {
    message: `El tipo de equipo de energía debe ser uno de los siguientes valores: ${Object.values(TipoEquipoEnergia).join(', ')}`,
  })
  tipoEquipoEnergia: TipoEquipoEnergia;
}
