import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('resolucion-pantalla')
export class ResolucionPantalla {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  resolucion: string;
}
