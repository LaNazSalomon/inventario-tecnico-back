import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoConexionRedDto } from './create-tipo-conexion-red.dto';

export class UpdateTipoConexionRedDto extends PartialType(CreateTipoConexionRedDto) {}
