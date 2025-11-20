import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('arquitectura-so')
export class ArquitecturaSO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  arquitectura: string; // Ej: x64, ARM64
}