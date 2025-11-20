import { Module } from '@nestjs/common';
import { TipoAlmacenamientoExtraibleService } from './tipo-almacenamiento-extraible.service';
import { TipoAlmacenamientoExtraibleController } from './tipo-almacenamiento-extraible.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAlmacenamientoExtraible } from './entities/tipo-almacenamiento-extraible.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoAlmacenamientoExtraible])],
  controllers: [TipoAlmacenamientoExtraibleController],
  providers: [TipoAlmacenamientoExtraibleService],
  exports: [TypeOrmModule],
})
export class TipoAlmacenamientoExtraibleModule {}
