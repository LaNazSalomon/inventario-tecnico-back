import { IsNotEmpty, IsString } from "class-validator";

export class CreateUnidadAcademicaDto {

    @IsString()
    @IsNotEmpty()
    nombreUnidad: string;
}
