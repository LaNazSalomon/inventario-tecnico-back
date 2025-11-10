import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePuestoDto {
  @IsString( { message: 'El nombre del puesto tiene que ser texto y no estar vacio' } )
  @IsNotEmpty()
  nombrePuesto: string;

  @IsString( { message: 'La descripcion debe ser texto y no tiene que estar vacio' } )
  @IsNotEmpty()
  descripcion: string;
}
