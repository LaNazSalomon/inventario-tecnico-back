import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('tipo-velocidad')
export class TipoVelocidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  unidad: string; // Ej: GHz, MHz
}