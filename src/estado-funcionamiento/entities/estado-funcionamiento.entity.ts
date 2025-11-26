import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('estado-funcionamiento')
export class EstadoFuncionamiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  estado: string;
}