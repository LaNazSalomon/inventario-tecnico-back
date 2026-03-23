import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilsReportDto } from './create-utils-report.dto';

export class UpdateUtilsReportDto extends PartialType(CreateUtilsReportDto) {}
