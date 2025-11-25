import { PartialType } from '@nestjs/mapped-types';
import { CreateTecladoDto } from './create-teclado.dto';

export class UpdateTecladoDto extends PartialType(CreateTecladoDto) {}
