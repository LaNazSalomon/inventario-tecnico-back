import { PartialType } from '@nestjs/mapped-types';
import { CreateModeloEquipoDto } from './create-modelo-equipo.dto';

export class UpdateModeloEquipoDto extends PartialType(CreateModeloEquipoDto) {}
