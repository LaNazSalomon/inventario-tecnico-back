import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDepartamentoDto {

    @IsString({ message: 'Texto en nombre departamento' })
    @IsNotEmpty({ message: 'No puede estar vacio el nombre del departamento' })
    nombreDepartamento: string;

    @IsUUID()
    @IsNotEmpty({ message: 'No puede estar vacio el departamento' })
    idUnidadAcademica: string;

}
