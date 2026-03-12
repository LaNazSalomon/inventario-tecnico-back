import { IsUUID } from 'class-validator';

export class UnidadAcademicaFilterDto {
  @IsUUID('4', { message: 'El unidadAcademicaId debe ser un UUID válido.' })
  unidadAcademicaId: string;
}
