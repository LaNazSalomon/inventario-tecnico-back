import { PartialType } from '@nestjs/mapped-types';
import { CreateVersionSoDto } from './create-version-so.dto';

export class UpdateVersionSoDto extends PartialType(CreateVersionSoDto) {}
