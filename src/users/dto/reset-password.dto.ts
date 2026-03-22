import {
  IsString,
  IsUUID,
  IsBoolean,
  IsOptional,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  usuarioId: string;

  @IsBoolean({
    message:
      'generarAutomatica debe ser true para generar automáticamente o false para contraseña manual',
  })
  generarAutomatica: boolean;

  @IsOptional()
  @IsString({ message: 'La contraseña debe ser un string' })
  @MinLength(6, {
    message: 'La contraseña debe contar por lo menos con 6 caracteres',
  })
  @MaxLength(50, {
    message: 'La contraseña no debe pasar de los 50 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener mayusculas, minusculas y numeros',
  })
  contrasenaManual?: string;
}
