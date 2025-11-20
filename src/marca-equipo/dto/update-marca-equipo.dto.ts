import { PartialType } from '@nestjs/mapped-types';
import { CreateMarcaEquipoDto } from './create-marca-equipo.dto';

export class UpdateMarcaEquipoDto extends PartialType(CreateMarcaEquipoDto) {}
