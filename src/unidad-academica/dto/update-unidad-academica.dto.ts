import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadAcademicaDto } from './create-unidad-academica.dto';

export class UpdateUnidadAcademicaDto extends PartialType(CreateUnidadAcademicaDto) {}
