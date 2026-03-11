import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoAlmacenamientoDto } from './create-equipo-almacenamiento.dto';

export class UpdateEquipoAlmacenamientoDto extends PartialType(CreateEquipoAlmacenamientoDto) {}
