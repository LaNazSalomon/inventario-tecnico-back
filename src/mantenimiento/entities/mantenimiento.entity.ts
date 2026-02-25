import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TipoEquipo } from '../enums/tipo-equipo.enums';

@Entity('mantenimiento')
export class Mantenimiento {
  @PrimaryGeneratedColumn('uuid')
  idMantenimiento: string;

  @Column('text')
  motivo: string;

  @Column('text')
  descripcion: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column('text')
  responsable: string;

  @Column('text')
  numeroInventario: string;

  @Column({
    type: 'enum',
    enum: TipoEquipo,
  })
  tipoEquipo: TipoEquipo;
}