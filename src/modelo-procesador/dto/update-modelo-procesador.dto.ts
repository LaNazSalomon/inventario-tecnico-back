import { PartialType } from '@nestjs/mapped-types';
import { CreateModeloProcesadorDto } from './create-modelo-procesador.dto';

export class UpdateModeloProcesadorDto extends PartialType(CreateModeloProcesadorDto) {}
