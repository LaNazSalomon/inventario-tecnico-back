import { IsOptional } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('tipo-conexion-red')
export class TipoConexionRed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  tipo: string; // Ej: Ethernet, Wi-Fi
}