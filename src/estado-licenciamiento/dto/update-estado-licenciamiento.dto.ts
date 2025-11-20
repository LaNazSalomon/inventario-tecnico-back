import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoLicenciamientoDto } from './create-estado-licenciamiento.dto';

export class UpdateEstadoLicenciamientoDto extends PartialType(CreateEstadoLicenciamientoDto) {}
