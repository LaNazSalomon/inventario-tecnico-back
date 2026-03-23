import { PartialType } from '@nestjs/mapped-types';
import { CreateEquiposImpresionDto } from './create-equipos-impresion.dto';

export class UpdateEquiposImpresionDto extends PartialType(CreateEquiposImpresionDto) {}
