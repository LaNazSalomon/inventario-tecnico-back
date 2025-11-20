import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('marca-equipo')
export class MarcaEquipo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;
}
