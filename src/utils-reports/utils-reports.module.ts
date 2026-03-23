import { Module } from '@nestjs/common';
import { UtilsReportsService } from './utils-reports.service';

@Module({
  providers: [UtilsReportsService],
  exports: [UtilsReportsService],
})
export class UtilsReportsModule {}