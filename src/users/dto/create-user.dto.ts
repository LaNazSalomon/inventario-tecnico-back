import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Roles } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @IsNumber(
    {},
    { message: 'Se esperaba que el numero de empleado fuera un numero' },
  )
  numeroEmpleado: string;

  @IsOptional()
  @IsEnum(Roles, {
    message: 'Solo pueden ser los roles existentes (admin, usuario).',
  })
  rol?: Roles;

  @IsString({ message: 'Se esperaba texto en el campo nombre.' })
  @IsNotEmpty()
  nombreEmpleado: string;

  @IsString({ message: 'Se esperaba texto en el campo apellido paterno.' })
  @IsNotEmpty()
  apellidoPaterno: string;

  @IsString({ message: 'Se esperaba texto en el campo apellido materno.' })
  @IsNotEmpty()
  apellidoMaterno: string;

  @IsEmail()
  email: string;

  @IsUUID('4', { message: 'El idPuesto debe ser un UUID válido.' })
  @IsNotEmpty()
  idPuesto: string;

  @IsUUID('4', { message: 'El idDepartamento debe ser un UUID válido.' })
  @IsNotEmpty()
  idDepartamento: string;

  @IsUUID('4', { message: 'La unidad académica debe ser un UUID válido.' })
  idUnidadAcademica: string;
}
