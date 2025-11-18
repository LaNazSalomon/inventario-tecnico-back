/*
*   Esta clase se puede utilizar en cualquier lugar que se dese implementar una paginacion
*/

import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{

    @IsOptional()
    @IsPositive()
    @Type( () => Number ) // Esto es para hacer un parseo ya que por defecto lo que viene en la url
    //se pasa a string
    limit?: number;

    @IsOptional()
    @Min( 0, { message: 'El valor minimo aceptado es cero' } )
    @Type ( () => Number )
    offset?: number;
}