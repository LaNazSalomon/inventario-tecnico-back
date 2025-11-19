import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoVelocidadDto } from './create-tipo-velocidad.dto';

export class UpdateTipoVelocidadDto extends PartialType(CreateTipoVelocidadDto) {}
