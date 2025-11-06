import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Se esperaba que el username fuera string' })
  numeroEmpleado: number;

  @IsString({ message: 'Se esperaba que la contraseña fuera string' })
  @MinLength(6, {
    message: 'La contraseña debe contar por lo menos con 6 caracteres',
  })
  @MaxLength(50, {
    message: 'La contraseña no debe pasar de los 50 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener mayusculas, minusculas y numeros',
  })
  password: string;
}
