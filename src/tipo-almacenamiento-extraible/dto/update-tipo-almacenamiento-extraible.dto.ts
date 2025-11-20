import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoAlmacenamientoExtraibleDto } from './create-tipo-almacenamiento-extraible.dto';

export class UpdateTipoAlmacenamientoExtraibleDto extends PartialType(CreateTipoAlmacenamientoExtraibleDto) {}
