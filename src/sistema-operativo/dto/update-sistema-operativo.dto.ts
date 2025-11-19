import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaOperativoDto } from './create-sistema-operativo.dto';

export class UpdateSistemaOperativoDto extends PartialType(CreateSistemaOperativoDto) {}
