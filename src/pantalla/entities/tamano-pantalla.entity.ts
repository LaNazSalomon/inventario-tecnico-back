import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tamano-pantalla')
export class TamanoPantalla {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pulgadas: string;
}
