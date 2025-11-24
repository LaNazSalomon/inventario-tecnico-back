import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoPantallaDto } from './create-tipo-pantalla.dto';

export class UpdateTipoPantallaDto extends PartialType(CreateTipoPantallaDto) {}
