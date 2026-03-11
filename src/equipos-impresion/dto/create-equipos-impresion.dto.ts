import {
  IsString,
  IsBoolean,
  IsEnum,
  IsUUID,
  IsOptional,
  IsInt,
  IsNumber,
} from 'class-validator';
import { ModoColorEquipoImpresion, TipoEquipoImpresion } from '../enums';

export class CreateEquiposImpresionDto {
    //TODO: Verificar si podemos meter numeros como 034
  @IsNumber(
    {},
    { message: 'El número de inventario debe ser un numero válido.' },
  )
  inventario: string;

  @IsBoolean({ message: 'El campo compartida debe ser verdadero o falso.' })
  compartida: boolean;

  @IsBoolean({ message: 'El campo multifuncional debe ser verdadero o falso.' })
  multifuncional: boolean;

  @IsString({ message: 'El número de serie debe ser un texto válido.' })
  serie: string;

  @IsUUID('4', { message: 'El usuario_id debe ser un UUID válido.' })
  usuarioId: string;

  @IsUUID('4', {
    message: 'El estado_funcionamiento_id debe ser un UUID válido.',
  })
  estadoFuncionamientoId: string;

  @IsUUID('4', {
    message: 'El marca_equipo_impresion_id debe ser un UUID válido.',
  })
  marcaEquipoImpresionId: string;

  @IsUUID('4', {
    message: 'El modelo_equipo_impresion_id debe ser un UUID válido.',
  })
  modeloEquipoImpresionId: string;

  @IsUUID('4', { message: 'La unidadAcademica debe ser un UUID válido.' })
  unidadAcademicaId: string;

  @IsUUID('4', { message: 'El departamento debe ser un UUID válido.' })
  departamentoAreaId: string;

  @IsEnum(TipoEquipoImpresion, {
    message: `El tipo de equipo de impresión debe ser uno de los siguientes valores: ${Object.values(TipoEquipoImpresion).join(', ')}`,
  })
  tipoEquipoImpresion: TipoEquipoImpresion;

  @IsEnum(ModoColorEquipoImpresion, {
    message: `El modo de color debe ser uno de los siguientes valores: ${Object.values(ModoColorEquipoImpresion).join(', ')}`,
  })
  modoColorEquipoImpresion: ModoColorEquipoImpresion;
}
