import { IsInt, IsString, IsDateString, IsUUID, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMonitorDto {
  @IsInt({ message: 'El número de inventario debe ser un número entero' })
  @IsNotEmpty({ message: 'El número de inventario no puede estar vacío' })
  numeroInventario: number;

  @IsString({ message: 'La marca debe ser texto' })
  @IsNotEmpty({ message: 'La marca no puede estar vacía' })
  marca: string;

  @IsString({ message: 'El modelo debe ser texto' })
  @IsNotEmpty({ message: 'El modelo no puede estar vacío' })
  modelo: string;

  @IsNumber({}, { message: 'Las pulgadas deben ser un número' })
  @IsNotEmpty({ message: 'Las pulgadas no pueden estar vacías' })
  pulgadas: number;

  @IsString({ message: 'La resolución debe ser texto' })
  @IsNotEmpty({ message: 'La resolución no puede estar vacía' })
  resolucion: string;

  @IsString({ message: 'El tipo de pantalla debe ser texto' })
  @IsNotEmpty({ message: 'El tipo de pantalla no puede estar vacío' })
  tipoPantalla: string;

  @IsInt({ message: 'La cantidad de puertos VGA debe ser un número entero' })
  cantidadPuertosVGA: number;

  @IsInt({ message: 'La cantidad de puertos DVI debe ser un número entero' })
  cantidadPuertosDVI: number;

  @IsInt({ message: 'La cantidad de puertos HDMI debe ser un número entero' })
  cantidadPuertosHDMI: number;

  @IsString({ message: 'La serie debe ser texto' })
  @IsNotEmpty({ message: 'La serie no puede estar vacía' })
  serie: string;

  @IsDateString({}, { message: 'La fecha de vencimiento de garantía debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La fecha de vencimiento de garantía no puede estar vacía' })
  fechaVencimientoGarantia: Date;

  @IsUUID('4', { message: 'El estado debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  idEstado: string;

  @IsUUID('4', { message: 'El empleado debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El empleado es obligatorio' })
  idEmpleado: string;

  @IsUUID('4', { message: 'El equipo debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El equipo es obligatorio' })
  idEquipo: string;
}