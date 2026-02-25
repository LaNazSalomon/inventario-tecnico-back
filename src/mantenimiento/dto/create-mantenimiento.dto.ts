import { IsString, IsDateString, IsEnum } from 'class-validator';
import { TipoEquipo } from '../enums/tipo-equipo.enums';

export class CreateMantenimientoDto {
  @IsString()
  motivo: string;

  @IsString()
  descripcion: string;

  @IsDateString()
  fecha: Date;

  @IsString()
  responsable: string;

  @IsString()
  numeroInventario: string;

  @IsEnum(TipoEquipo)
  tipoEquipo: TipoEquipo;
}
