import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsUUID,
  IsNumber,
  IsOptional,
  IsDateString,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { TipoServidor } from '../enums/tipo-servidor.enum';
import { SistemaOperativo } from 'src/equipos-computo/enums/sistema-operativo.enum';
import { Arquitectura } from 'src/equipos-computo/enums/arquitectura.enum';
import { EstadoLicencia } from 'src/equipos-computo/enums/estado-licencia.enum';
import { TipoConexionRed } from 'src/equipos-computo/enums/tipo-conexion-red.enum';

export class CreateServidorDto {
  @IsEnum(TipoServidor, {
    message: 'El tipo de servidor debe ser válido (Físico, Virtual, Cloud)',
  })
  tipoServidor: TipoServidor;

  @IsUUID('4', { message: 'La marca debe ser un UUID válido' })
  marcaId: string;

  @IsUUID('4', { message: 'El modelo debe ser un UUID válido' })
  modeloId: string;

  @IsUUID('4', { message: 'El tipo de procesador debe ser un UUID válido' })
  tipoProcesadorId: string;

  @IsUUID('4', { message: 'El modelo de procesador debe ser un UUID válido' })
  modeloProcesadorId: string;

  @IsNumber({}, { message: 'La velocidad del procesador debe ser numérica' })
  velocidadProcesador: number;

  @IsInt({ message: 'El número de núcleos debe ser entero' })
  nucleosProcesador: number;

  @IsInt({ message: 'La cantidad de procesadores debe ser un número entero' })
  cantidadProcesadores: number;

  @IsInt({
    message: 'La cantidad máxima de procesadores debe ser un número entero',
  })
  cantidadMaxProcesadores: number;

  @IsInt({ message: 'La capacidad de RAM debe ser un número entero' })
  capacidadRAM: number;

  @IsInt({ message: 'La capacidad máxima de RAM debe ser un número entero' })
  capacidadMaxRAM: number;

  @IsInt({
    message: 'La capacidad de almacenamiento debe ser un número entero',
  })
  capacidadAlmacenamiento: number;

  @IsNumber(
    {},
    { message: 'El porcentaje de uso de almacenamiento debe ser numérico' },
  )
  porcentajeUsoAlmacenamiento: number;

  @IsEnum(SistemaOperativo, {
    message:
      'El sistema operativo debe ser válido (Windows, Linux, macOS, Otro)',
  })
  sistemaOperativo: SistemaOperativo;

  @IsUUID('4', { message: 'La versión del SO debe ser un UUID válido' })
  versionSOId: string;

  @IsEnum(Arquitectura, { message: 'La arquitectura del SO no es válida' })
  arquitecturaSO: Arquitectura;

  @IsEnum(EstadoLicencia, {
    message:
      'El estado de la licencia debe ser válido (Activa, Expirada, En prueba)',
  })
  estadoLicenciamientoSO: EstadoLicencia;

  @IsEnum(TipoConexionRed, {
    message:
      'El tipo de conexión debe ser válido (WiFi, Ethernet, Datos móviles)',
  })
  tipoConexion: TipoConexionRed;

  @IsString({ message: 'La dirección IP interna debe ser texto' })
  direccionIPInterna: string;

  @IsString({ message: 'La dirección IP externa debe ser texto' })
  direccionIPExterna: string;

  @IsString({ message: 'El rol debe ser texto' })
  rol: string;

  @IsString({ message: 'El propósito debe ser texto' })
  proposito: string;

  @IsString({ message: 'La criticidad debe ser texto' })
  criticidad: string;

  @IsString({ message: 'Los puertos abiertos deben ser texto' })
  puertosAbiertos: string;

  @IsBoolean({ message: 'El campo aplicaBalanceoCarga debe ser booleano' })
  aplicaBalanceoCarga: boolean;

  @IsString({ message: 'La política de respaldo debe ser texto' })
  politicaRespaldo: string;

  @IsString({ message: 'El tipo de política de respaldo debe ser texto' })
  tipoPoliticaRespaldo: string;

  @IsString({ message: 'La periodicidad de respaldo debe ser texto' })
  periodicidadRespaldo: string;

  @IsString({ message: 'La serie debe ser texto' })
  serie: string;

  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'La fecha de vencimiento de garantía debe tener formato de fecha',
    },
  )
  fechaVencimientoGarantia?: Date;

  @IsUUID('4', {
    message: 'El estado de funcionamiento debe ser un UUID válido',
  })
  estadoFuncionamientoId: string;

  @IsUUID('4', { message: 'El empleado debe ser un UUID válido' })
  empleadoId: string;

  @IsUUID('4', { message: 'El departamento debe ser un UUID válido.' })
  idDepartamento: string;

  @IsUUID('4', { message: 'La unidad académica debe ser un UUID válido.' })
  idUnidadAcademica: string;
}
