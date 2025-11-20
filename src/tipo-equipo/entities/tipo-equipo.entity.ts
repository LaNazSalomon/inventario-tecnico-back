import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('tipo-equipo')
export class TipoEquipo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;
}