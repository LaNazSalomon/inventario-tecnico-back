import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoProcesadorDto } from './create-tipo-procesador.dto';

export class UpdateTipoProcesadorDto extends PartialType(CreateTipoProcesadorDto) {}
