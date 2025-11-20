import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('tipo-conexion-red')
export class TipoConexionRed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string; // Ej: Ethernet, Wi-Fi
}