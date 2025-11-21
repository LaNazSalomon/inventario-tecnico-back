import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//TODO: Esto se queda pendiente, preferentemente hacer archivos por cada uno
@Entity('tipo-pantalla')
export class TipoPantalla {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipo: string;
}

@Entity('resolucion-pantalla')
export class ResolucionPantalla {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  resolucion: string;
}

@Entity('tamano-pantalla')
export class TamanoPantalla {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pulgadas: string;
}