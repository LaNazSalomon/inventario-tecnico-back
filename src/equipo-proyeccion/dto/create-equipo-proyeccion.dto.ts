import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsInt,
  IsDateString,
  Min,
} from 'class-validator';
import { TipoPantalla, TipoEquipoProyeccion } from '../enums';

export class CreateEquipoProyeccionDto {
  @IsString({ message: 'El número de inventario debe ser un texto válido.' })
  inventario: string;

  @IsString({ message: 'El número de serie debe ser un texto válido.' })
  serie: string;

  @IsOptional()
  @IsString({
    message:
      'Las pulgadas deben ser un texto válido (ej. "55", "30 a 300", "N/A").',
  })
  pulgadas?: string;

  @IsString({ message: 'La resolución debe ser un texto válido.' })
  resolucion: string;

  @IsInt({ message: 'La cantidad de puertos USB A debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de puertos USB A no puede ser negativa.' })
  cantidadPuertosUsbA: number;

  @IsInt({ message: 'La cantidad de puertos USB B debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de puertos USB B no puede ser negativa.' })
  cantidadPuertosUsbB: number;

  @IsInt({ message: 'La cantidad de puertos VGA debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de puertos VGA no puede ser negativa.' })
  cantidadPuertosVga: number;

  @IsInt({ message: 'La cantidad de puertos DVI debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de puertos DVI no puede ser negativa.' })
  cantidadPuertosDvi: number;

  @IsInt({ message: 'La cantidad de puertos HDMI debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de puertos HDMI no puede ser negativa.' })
  cantidadPuertosHdmi: number;

  @IsInt({ message: 'La cantidad de puertos RJ45 debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de puertos RJ45 no puede ser negativa.' })
  cantidadPuertosRj45: number;

  @IsInt({ message: 'La cantidad de puertos RCA debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de puertos RCA no puede ser negativa.' })
  cantidadPuertosRca: number;

  @IsInt({
    message: 'La cantidad de puertos Super Video debe ser un número entero.',
  })
  @Min(0, {
    message: 'La cantidad de puertos Super Video no puede ser negativa.',
  })
  cantidadPuertosSuperVideo: number;

  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'La fecha de vencimiento de garantía debe ser una fecha válida (YYYY-MM-DD).',
    },
  )
  fechaVencimientoGarantia?: Date;

  // Relaciones (IDs como UUID)
  @IsUUID('4', { message: 'El usuario_id debe ser un UUID válido.' })
  usuarioId: string;

  @IsUUID('4', {
    message: 'El estado_funcionamiento_id debe ser un UUID válido.',
  })
  estadoFuncionamientoId: string;

  @IsUUID('4', {
    message: 'El marca_equipo_proyeccion_id debe ser un UUID válido.',
  })
  marcaEquipoProyeccionId: string;

  @IsUUID('4', {
    message: 'El modelo_equipo_proyeccion_id debe ser un UUID válido.',
  })
  modeloEquipoProyeccionId: string;

  @IsUUID('4', { message: 'La unidadAcademica debe ser un UUID válido.' })
  unidadAcademicaId: string;

  @IsUUID('4', { message: 'El departamento debe ser un UUID válido.' })
  departamentoAreaId: string;

  @IsEnum(TipoEquipoProyeccion, {
    message: `El tipo de equipo de proyección debe ser uno de los siguientes valores: ${Object.values(TipoEquipoProyeccion).join(', ')}`,
  })
  tipoEquipoProyeccion: TipoEquipoProyeccion;

  @IsEnum(TipoPantalla, {
    message: `El tipo de equipo de pantalla debe ser uno de los siguientes valores: ${Object.values(TipoPantalla).join(', ')}`,
  })
  tipoPantalla: TipoPantalla
}
