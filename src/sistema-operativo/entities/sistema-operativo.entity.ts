import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('sistema-operativo')
export class SistemaOperativo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;
}