import { TipoProcesador } from "src/tipo-procesador/entities/tipo-procesador.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('modelo-procesador')
export class ModeloProcesador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @ManyToOne(() => TipoProcesador)
  @JoinColumn({ name: 'tipo_procesador_id' })
  tipo: TipoProcesador;
}