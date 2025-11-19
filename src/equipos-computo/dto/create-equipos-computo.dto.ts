import {
  IsString,
  IsInt,
  IsNumber,
  IsDate,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEquiposComputoDto {
  @IsString({ message: 'El campo inventarioCSYT debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo inventarioCSYT es obligatorio' })
  inventarioCSYT: string;

  @IsString({ message: 'El nombre del equipo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del equipo es obligatorio' })
  nombreEquipo: string;

  @IsString({ message: 'El tipo de equipo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de equipo es obligatorio' })
  tipoEquipo: string;

  @IsString({ message: 'La marca debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La marca es obligatoria' })
  marca: string;

  @IsString({ message: 'El modelo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El modelo es obligatorio' })
  modelo: string;

  @IsString({ message: 'La dirección IP debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección IP es obligatoria' })
  direccionIP: string;

  @IsString({ message: 'El servidor DNS debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El servidor DNS es obligatorio' })
  direccionServidorDNS: string;

  @IsString({ message: 'La máscara de subred debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La máscara de subred es obligatoria' })
  mascaraSubRed: string;

  @IsString({ message: 'La puerta de enlace debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La puerta de enlace es obligatoria' })
  puertaEnlace: string;

  @IsString({ message: 'El nombre de dominio debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de dominio es obligatorio' })
  nombreDominio: string;

  @IsString({ message: 'El tipo de conexión debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de conexión es obligatorio' })
  tipoConexionRed: string;

  @IsString({ message: 'El tipo de procesador debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de procesador es obligatorio' })
  tipoProcesador: string;

  @IsString({ message: 'El modelo de procesador debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El modelo de procesador es obligatorio' })
  modeloProcesador: string;

  @IsNumber({}, { message: 'La velocidad del procesador debe ser un número' })
  @Type(() => Number)
  velocidadProcesador: number;

  @IsString({ message: 'El tipo de velocidad debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de velocidad es obligatorio' })
  tipoVelocidad: string;

  @IsInt({ message: 'El número de núcleos debe ser un entero' })
  @Type(() => Number)
  nucleos: number;

  @IsString({ message: 'La capacidad RAM debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La capacidad RAM es obligatoria' })
  capacidadRam: string;

  @IsString({ message: 'La capacidad de almacenamiento debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La capacidad de almacenamiento es obligatoria' })
  capacidadAlmacenamiento: string;

  @IsString({ message: 'El sistema operativo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El sistema operativo es obligatorio' })
  sistemaOperativo: string;

  @IsString({ message: 'La versión del SO debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La versión del SO es obligatoria' })
  versionSO: string;

  @IsString({ message: 'La arquitectura del SO debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La arquitectura del SO es obligatoria' })
  arquitecturaSO: string;

  @IsString({ message: 'El estado de licenciamiento debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El estado de licenciamiento es obligatorio' })
  estadoLicenciamiento: string;

  @IsString({ message: 'El estado de funcionamiento debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El estado de funcionamiento es obligatorio' })
  estadoFuncionamiento: string;

  @IsString({ message: 'La serie debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La serie es obligatoria' })
  serie: string;

  @IsString({ message: 'El tamaño de pantalla debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tamaño de pantalla es obligatorio' })
  pantallaPulgadas: string;

  @IsString({ message: 'La resolución de pantalla debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La resolución de pantalla es obligatoria' })
  pantallaResolucion: string;

  @IsString({ message: 'El tipo de pantalla debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de pantalla es obligatorio' })
  pantallaTipo: string;

  @IsInt({ message: 'La cantidad de puertos USB debe ser un número entero' })
  @Type(() => Number)
  cantidadPuertosUSB: number;

  @IsInt({ message: 'La cantidad de puertos de audio debe ser un número entero' })
  @Type(() => Number)
  cantidadPuertosAudio: number;

  @IsInt({ message: 'La cantidad de puertos de red debe ser un número entero' })
  @Type(() => Number)
  cantidadPuertosRed: number;

  @IsInt({ message: 'La cantidad de puertos HDMI debe ser un número entero' })
  @Type(() => Number)
  cantidadPuertosHDMI: number;

  @IsInt({ message: 'La cantidad de puertos VGA debe ser un número entero' })
  @Type(() => Number)
  cantidadPuertosVGA: number;

  @IsInt({ message: 'La cantidad de puertos DVI debe ser un número entero' })
  @Type(() => Number)
  cantidadPuertosDVI: number;

  @IsInt({ message: 'La cantidad de puertos serial debe ser un número entero' })
  @Type(() => Number)
  cantidadPuertosSerial: number;

  @IsInt({ message: 'La cantidad de cámaras web debe ser un número entero' })
  @Type(() => Number)
  cantidadCamaraWeb: number;

  @IsInt({ message: 'La cantidad de micrófonos debe ser un número entero' })
  @Type(() => Number)
  cantidadMicrofono: number;

  @IsString({ message: 'El tipo de almacenamiento extraíble debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de almacenamiento extraíble es obligatorio' })
  tipoAlmacenamientoExtraible: string;

  @IsDate({ message: 'La fecha de vencimiento de garantía debe ser una fecha válida' })
  @Type(() => Date)
  fechaVencimientoGarantia: Date;

  @IsString({ message: 'El complemento debe ser una cadena de texto' })
  @IsOptional()
  complemento?: string;

  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  @Type(() => Number)
  usuario: number;

  @IsInt({ message: 'El ID de la unidad académica debe ser un número entero' })
  @Type(() => Number)
  unidadAcademica: number;

  @IsInt({ message: 'El ID del departamento debe ser un número entero' })
  @Type(() => Number)
  departamento: number;
}