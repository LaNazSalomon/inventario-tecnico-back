import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsBoolean,
  IsIP,
} from 'class-validator';
import { TipoEquipoTelefonico, TipoConexionRed } from '../enums';

export class CreateEquipoTelefonicoDto {
  @IsOptional()
  @IsString({ message: 'El número de inventario debe ser un texto válido.' })
  inventario?: string;

  @IsOptional()
  @IsString({ message: 'El número de serie debe ser un texto válido.' })
  serie?: string;

  @IsEnum(TipoEquipoTelefonico, {
    message: `El tipo de equipo telefónico debe ser uno de los siguientes valores: ${Object.values(TipoEquipoTelefonico).join(', ')}`,
  })
  tipoEquipoTelefonico: TipoEquipoTelefonico;

  @IsUUID('4', {
    message: 'El marca_equipo_telefonico_id debe ser un UUID válido.',
  })
  marcaEquipoTelefonicoId: string;

  @IsUUID('4', {
    message: 'El modelo_equipo_telefonico_id debe ser un UUID válido.',
  })
  modeloEquipoTelefonicoId: string;

  @IsEnum(TipoConexionRed, {
    message: `El tipo de conexión de red debe ser uno de los siguientes valores: ${Object.values(TipoConexionRed).join(', ')}`,
  })
  tipoConexionRed: TipoConexionRed;

  @IsOptional()
  @IsIP(undefined, { message: 'La dirección IP debe ser válida.' })
  direccionIp?: string;

  @IsOptional()
  @IsString({ message: 'El número de extensión debe ser un texto válido.' })
  numeroExtension?: string;

  @IsBoolean({ message: 'El campo DID debe ser verdadero o falso.' })
  did: boolean;

  @IsUUID('4', { message: 'El usuario_id debe ser un UUID válido.' })
  usuarioId: string;

  @IsUUID('4', {
    message: 'El estado_funcionamiento_id debe ser un UUID válido.',
  })
  estadoFuncionamientoId: string;

  @IsUUID('4', { message: 'El departamento debe ser un UUID válido.' })
  idDepartamento: string;

  @IsUUID('4', { message: 'La unidad académica debe ser un UUID válido.' })
  idUnidadAcademica: string;
}
