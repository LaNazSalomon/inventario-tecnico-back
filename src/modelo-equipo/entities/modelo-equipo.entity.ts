import { MarcaEquipo } from "src/marca-equipo/entities/marca-equipo.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('modelo-equipo')
export class ModeloEquipo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @ManyToOne(() => MarcaEquipo)
  @JoinColumn({ name: 'marca_id' })
  marca: MarcaEquipo;
}