import { PartialType } from '@nestjs/mapped-types';
import { CreateEquiposComputoDto } from './create-equipos-computo.dto';

export class UpdateEquiposComputoDto extends PartialType(CreateEquiposComputoDto) {}
