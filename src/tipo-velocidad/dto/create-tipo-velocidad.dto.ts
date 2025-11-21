import { IsNotEmpty, IsString } from "class-validator";

//TODO: Falta de aqui en adelante respecto a relaciones de equipo-computo
export class CreateTipoVelocidadDto {
  @IsString()
  @IsNotEmpty()
  unidad: string;
}
