import { IsInt, IsString, IsDateString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateTecladoDto {
  @IsInt({ message: 'El número de inventario debe ser entero' })
  numeroInventario: number;

  @IsString({ message: 'La marca debe ser texto' })
  marca: string;

  @IsString({ message: 'El modelo debe ser texto' })
  modelo: string;

  @IsString({ message: 'El tipo de conector debe ser texto' })
  tipoConector: string;

  @IsString({ message: 'La serie debe ser texto' })
  serie: string;

  @IsDateString({}, { message: 'La fecha de vencimiento debe ser una fecha válida' })
  fechaVencimientoGarantia: Date;

  @IsUUID('4', { message: 'El estado debe ser un UUID válido' })
  idEstado: string;

  @IsUUID('4', { message: 'El empleado debe ser un UUID válido' })
  idEmpleado: string;

  @IsUUID('4', { message: 'El equipo debe ser un UUID válido' })
  idEquipo: string;
}