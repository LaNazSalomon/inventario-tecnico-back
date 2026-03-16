import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('version-so')
export class VersionSO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  version: string;
}
