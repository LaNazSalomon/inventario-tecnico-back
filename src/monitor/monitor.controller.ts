import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('monitor')
@Auth()
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Post()
  create(@Body() createMonitorDto: CreateMonitorDto) {
    return this.monitorService.create(createMonitorDto);
  }

  @Get()
  findAll() {
    return this.monitorService.findAll();
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.monitorService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMonitorDto: UpdateMonitorDto) {
    return this.monitorService.update(id, updateMonitorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.monitorService.remove(id);
  }
}
