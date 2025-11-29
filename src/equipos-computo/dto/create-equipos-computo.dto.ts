import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsUUID,
  IsNumber,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Arquitectura } from '../enums/arquitectura.enum';
import { TipoVelocidad } from '../enums/tipo-velocidad-procesador.enum';
import { TipoConexionRed } from '../enums/tipo-conexion-red.enum';
import { EstadoLicencia } from '../enums/estado-licencia.enum';
import { SistemaOperativo } from '../enums/sistema-operativo.enum';

export class CreateEquiposComputoDto {
  @IsNotEmpty({ message: 'El inventario no puede estar vacío' })
  inventario: string;

  @IsString({ message: 'El nombre del equipo tiene que ser texto' })
  @IsNotEmpty({ message: 'El nombre del equipo no puede estar vacío' })
  nombreEquipo: string;

  @IsUUID('4', { message: 'El tipo de equipo debe ser un UUID válido' })
  tipoEquipoId: string;

  @IsUUID('4', { message: 'La marca debe ser un UUID válido' })
  marcaId: string;

  @IsUUID('4', { message: 'El modelo debe ser un UUID válido' })
  modeloId: string;

  @IsString({ message: 'La dirección IP debe ser texto' })
  direccionIP: string;

  @IsString({ message: 'El DNS debe ser texto' })
  direccionServidorDNS: string;

  @IsString({ message: 'La máscara de subred debe ser texto' })
  mascaraSubRed: string;

  @IsString({ message: 'La puerta de enlace debe ser texto' })
  puertaEnlace: string;

  @IsString({ message: 'El nombre de dominio debe ser texto' })
  nombreDominio: string;

  @IsEnum(TipoConexionRed, {
    message:
      'El tipo de conexión debe ser válido (ej. Wi‑Fi, Ethernet, Datos móviles)',
  })
  tipoConexionRed: TipoConexionRed;

  @IsUUID('4', { message: 'El tipo de procesador debe ser un UUID válido' })
  tipoProcesadorId: string;

  @IsUUID('4', { message: 'El modelo de procesador debe ser un UUID válido' })
  modeloProcesadorId: string;

  @IsNumber({}, { message: 'La velocidad del procesador debe ser numérica' })
  velocidadProcesador: number;

  @IsEnum(TipoVelocidad, {
    message: 'El tipo de velocidad debe ser uno de: Hz, kHz, MHz, GHz, THz',
  })
  tipoVelocidad: TipoVelocidad;

  @IsInt({ message: 'El número de núcleos debe ser entero' })
  nucleos: number;

  @IsString({ message: 'La capacidad de RAM debe ser texto' })
  capacidadRam: string;

  @IsString({ message: 'La capacidad de almacenamiento debe ser texto' })
  capacidadAlmacenamiento: string;

  @IsEnum(SistemaOperativo, {
    message:
      'El sistema operativo debe ser válido (Windows, Linux, macOS, Android, iOS, Otro)',
  })
  sistemaOperativo: SistemaOperativo;

  @IsUUID('4', { message: 'La versión del SO debe ser un UUID válido' })
  versionSOId: string;

  @IsEnum(Arquitectura, {
    message: 'La arquitectura del SO no es válida',
  })
  arquitecturaSO: Arquitectura;

  @IsEnum(EstadoLicencia, {
    message:
      'El estado de la licencia debe ser válido (ej. Activa, Expirada, En prueba)',
  })
  estadoLicencia: EstadoLicencia;

  @IsUUID('4', {
    message: 'El estado de funcionamiento debe ser un UUID válido',
  })
  estadoFuncionamientoId: string;

  @IsString({ message: 'La serie debe ser texto' })
  serie: string;

  @IsInt({ message: 'La cantidad de puertos USB debe ser un número entero' })
  cantidadPuertosUSB: number;

  @IsInt({
    message: 'La cantidad de puertos de audio debe ser un número entero',
  })
  cantidadPuertosAudio: number;

  @IsInt({ message: 'La cantidad de puertos de red debe ser un número entero' })
  cantidadPuertosRed: number;

  @IsInt({ message: 'La cantidad de puertos HDMI debe ser un número entero' })
  cantidadPuertosHDMI: number;

  @IsInt({ message: 'La cantidad de puertos VGA debe ser un número entero' })
  cantidadPuertosVGA: number;

  @IsInt({ message: 'La cantidad de puertos DVI debe ser un número entero' })
  cantidadPuertosDVI: number;

  @IsInt({ message: 'La cantidad de puertos serial debe ser un número entero' })
  cantidadPuertosSerial: number;

  @IsInt({ message: 'La cantidad de cámaras web debe ser un número entero' })
  cantidadCamaraWeb: number;

  @IsInt({ message: 'La cantidad de micrófonos debe ser un número entero' })
  cantidadMicrofono: number;

  @IsUUID('4', {
    message: 'El tipo de almacenamiento extraíble debe ser un UUID válido',
  })
  tipoAlmacenamientoExtraibleId: string;

  @IsDateString(
    {},
    {
      message:
        'La fecha de vencimiento de garantía debe tener formato de fecha',
    },
  )
  fechaVencimientoGarantia!: Date;

  @IsString({ message: 'El complemento debe ser texto' })
  @IsOptional()
  complemento?: string;

  @IsInt({
    message: 'La cantidad de puertos MiniHDMI debe ser un número entero',
  })
  cantidadPuertosMiniHDMI: number;

  @IsInt({
    message:
      'La cantidad de puertos de tarjeta de memoria debe ser un número entero',
  })
  cantidadPuertosTarjetaMemoria: number;

  @IsInt({ message: 'La cantidad de puertos DIN5 debe ser un número entero' })
  cantidadPuertosDIN5: number;

  @IsInt({ message: 'La cantidad de puertos DIN6 debe ser un número entero' })
  cantidadPuertosDIN6: number;

  @IsInt({
    message: 'La cantidad de puertos MiniDIN debe ser un número entero',
  })
  cantidadPuertosMiniDIN: number;

  @IsString({ message: 'La dirección MAC debe ser texto' })
  mac: string;

  @IsInt({
    message: 'La cantidad de puertos paralelo debe ser un número entero',
  })
  cantidadPuertosParalelo: number;

  @IsInt({
    message: 'La cantidad de puertos DisplayPort debe ser un número entero',
  })
  cantidadPuertosDisplayPort: number;

  @IsInt({
    message: 'La cantidad de puertos Serial COM1 debe ser un número entero',
  })
  cantidadPuertoSerialCom1: number;

  @IsUUID('4', { message: 'El empleado asignado debe ser un UUID válido' })
  empleadoAsignadoId: string;

  @IsUUID('4', { message: 'La unidad académica debe ser un UUID válido' })
  unidadAcademicaId: string;

  @IsUUID('4', { message: 'El departamento debe ser un UUID válido' })
  departamentoAreaId: string;
}
