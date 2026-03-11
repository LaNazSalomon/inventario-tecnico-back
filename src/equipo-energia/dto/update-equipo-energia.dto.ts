import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoEnergiaDto } from './create-equipo-energia.dto';

export class UpdateEquipoEnergiaDto extends PartialType(CreateEquipoEnergiaDto) {}
