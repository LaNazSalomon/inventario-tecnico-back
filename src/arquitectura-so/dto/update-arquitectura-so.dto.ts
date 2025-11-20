import { PartialType } from '@nestjs/mapped-types';
import { CreateArquitecturaSoDto } from './create-arquitectura-so.dto';

export class UpdateArquitecturaSoDto extends PartialType(CreateArquitecturaSoDto) {}
