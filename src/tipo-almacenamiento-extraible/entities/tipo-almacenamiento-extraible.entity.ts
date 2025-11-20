import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo-almacenamiento-extraible')
export class TipoAlmacenamientoExtraible {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  tipo: string; // Ej: USB, SD, etc.
}