import { PartialType } from '@nestjs/mapped-types';
import { CreateTamanoPantallaDto } from './create-tamano-pantalla.dto';

export class UpdateTamanoPantallaDto extends PartialType(CreateTamanoPantallaDto) {}
