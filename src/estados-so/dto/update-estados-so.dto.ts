import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadosSoDto } from './create-estados-so.dto';

export class UpdateEstadosSoDto extends PartialType(CreateEstadosSoDto) {}
