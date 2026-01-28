import { PartialType } from '@nestjs/mapped-types';
import { CreateServidoreDto } from './create-servidor.dto';

export class UpdateServidoreDto extends PartialType(CreateServidoreDto) {}
