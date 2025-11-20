import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('tipo-procesador')
export class TipoProcesador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;
}