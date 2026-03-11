import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoProyeccionDto } from './create-equipo-proyeccion.dto';

export class UpdateEquipoProyeccionDto extends PartialType(CreateEquipoProyeccionDto) {}
