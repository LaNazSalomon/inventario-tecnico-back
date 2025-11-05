import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from 'common/enums/role.enum';

export class CreateUserDto {
  @IsNumber()
  numeroEmpleado: number;

  @IsOptional()
  @IsEnum(Role, { message: 'Solo pueden ser los roles existentes (admin, user).' })
  rol?: Role;

  @IsString({ message: 'Se esperaba texto en el campo nombré.' })
  nombreEmpleado: string;

  @IsString({ message: 'Se esperaba texto en el campo apellido paterno.' })
  apellidoPaterno: string;

  @IsString({ message: 'Se esperaba texto en el campo apellido materno.' })
  apellidoMaterno: string;

  @IsString({ message: 'Se esperaba texto en el campo puesto de trabajo.' })
  puestoTrabajo: string;
}
