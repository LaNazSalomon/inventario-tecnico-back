import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoTelefonicoDto } from './create-equipo-telefonico.dto';

export class UpdateEquipoTelefonicoDto extends PartialType(CreateEquipoTelefonicoDto) {}
