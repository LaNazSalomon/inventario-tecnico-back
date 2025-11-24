import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo-almacenamiento-extraible')
export class TipoAlmacenamientoExtraible {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipo: string; // Ej: USB, SD, etc.
}