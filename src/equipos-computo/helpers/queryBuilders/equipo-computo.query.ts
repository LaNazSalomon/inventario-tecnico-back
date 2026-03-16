import { EquiposComputo } from 'src/equipos-computo/entities/equipos-computo.entity';
import { Repository } from 'typeorm';

export const buildComputoQuery = (
  repo: Repository<EquiposComputo>,
  userId: string,
) => {
  return repo
    .createQueryBuilder('ec')
    .innerJoin('ec.tipoEquipo', 'te')
    .innerJoin('ec.marca', 'ma')
    .innerJoin('ec.modelo', 'mo')
    .innerJoin('ec.tipoProcesador', 'tp')
    .innerJoin('ec.modeloProcesador', 'mp')
    .innerJoin('ec.versionSO', 'vso')
    .innerJoin('ec.estadoFuncionamiento', 'ef')
    .innerJoin('ec.tipoAlmacenamientoExtraible', 'tae')
    .innerJoin('ec.empleadoAsignado', 'u')
    .innerJoin('ec.unidadAcademica', 'ua')
    .innerJoin('ec.departamentoArea', 'd')
    .select([
      'ec."id" AS id',
      'ec.inventario AS inventario',
      'ec.nombreEquipo AS nombreEquipo',
      'te."nombre" AS tipo_equipo',
      'ma."nombre" AS marca',
      'mo."nombre" AS modelo',
      'ec.direccionIP AS direccionIP',
      'ec.direccionServidorDNS AS direccionServidorDNS',
      'ec.mascaraSubRed AS mascaraSubRed',
      'ec.puertaEnlace AS puertaEnlace',
      'ec.nombreDominio AS nombreDominio',
      'ec."tipo_conexion_red" AS tipoConexionRed',
      'tp."nombre" AS tipo_procesador',
      'mp."nombre" AS modelo_procesador',
      'ec.velocidadProcesador AS velocidadProcesador',
      'ec."tipo_velocidad" AS tipoVelocidad',
      'ec.nucleos AS nucleos',
      'ec.capacidadRam AS capacidadRam',
      'ec.capacidadAlmacenamiento AS capacidadAlmacenamiento',
      'ec."sistema_operativo" AS sistemaOperativo',
      'vso."version" AS versionSO',
      'ec."arquitectura_so" AS arquitecturaSO',
      'ec."estado_licencia" AS estadoLicencia',
      'ef."estado" AS estado_funcionamiento',
      'ec.serie AS serie',
      'ec.cantidadPuertosUSB AS cantidadPuertosUSB',
      'ec.cantidadPuertosAudio AS cantidadPuertosAudio',
      'ec.cantidadPuertosRed AS cantidadPuertosRed',
      'ec.cantidadPuertosHDMI AS cantidadPuertosHDMI',
      'ec.cantidadPuertosVGA AS cantidadPuertosVGA',
      'ec.cantidadPuertosDVI AS cantidadPuertosDVI',
      'ec.cantidadPuertosSerial AS cantidadPuertosSerial',
      'ec.cantidadCamaraWeb AS cantidadCamaraWeb',
      'ec.cantidadMicrofono AS cantidadMicrofono',
      'tae."tipo" AS tipo_almacenamiento_extraible',
      'ec.fechaVencimientoGarantia AS fechaVencimientoGarantia',
      'ec.complemento AS complemento',
      'ec.cantidadPuertosMiniHDMI AS cantidadPuertosMiniHDMI',
      'ec.cantidadPuertosTarjetaMemoria AS cantidadPuertosTarjetaMemoria',
      'ec.cantidadPuertosDIN5 AS cantidadPuertosDIN5',
      'ec.cantidadPuertosDIN6 AS cantidadPuertosDIN6',
      'ec.cantidadPuertosMiniDIN AS cantidadPuertosMiniDIN',
      'ec.mac AS mac',
      'ec.cantidadPuertosParalelo AS cantidadPuertosParalelo',
      'ec.cantidadPuertosDisplayPort AS cantidadPuertosDisplayPort',
      'ec.cantidadPuertoSerialCom1 AS cantidadPuertoSerialCom1',
      'u."nombreEmpleado" AS nombreEmpleado',
      'ua."nombreUnidad" AS unidad_academica',
      'd."nombreDepartamento" AS departamento',
    ])
    .where('u."idEmpleado" = :userId', { userId })
    .getRawMany();
};
