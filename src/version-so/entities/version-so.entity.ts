import { SistemaOperativo } from "src/sistema-operativo/entities/sistema-operativo.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('version-so')
export class VersionSO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  version: string;

  @ManyToOne(() => SistemaOperativo)
  @JoinColumn({ name: 'sistema_operativo_id' })
  sistemaOperativo: SistemaOperativo;
}