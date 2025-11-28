import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//TODO: Esto se queda pendiente, preferentemente hacer archivos por cada uno
@Entity('tipo-pantalla')
export class TipoPantalla {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  tipo: string;
}