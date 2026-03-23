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
      'ec.inventario',
      'ec.nombreEquipo',
      'te."nombre" AS tipo_equipo',
      'ma."nombre" AS marca',
      'mo."nombre" AS modelo',
      'ec."direccionIP"',
      'ec."direccionServidorDNS"',
      'ec."mascaraSubRed"',
      'ec."puertaEnlace"',
      'ec."nombreDominio"',
      'ec."tipoConexionRed"',
      'tp."nombre" AS tipo_procesador',
      'mp."nombre" AS modelo_procesador',
      'ec."velocidadProcesador"',
      'ec."tipoVelocidad"',
      'ec.nucleos AS nucleos',
      'ec."capacidadRam"',
      'ec."capacidadAlmacenamiento"',
      'ec."sistemaOperativo"',
      'vso."version" AS version_so',
      'ec."arquitecturaSO"',
      'ec."estadoLicencia"',
      'ef."estado" AS estado_funcionamiento',
      'ec.serie AS serie',
      'ec."cantidadPuertosUSB"',
      'ec."cantidadPuertosAudio"',
      'ec."cantidadPuertosRed"',
      'ec."cantidadPuertosHDMI"',
      'ec."cantidadPuertosVGA"',
      'ec."cantidadPuertosDVI"',
      'ec."cantidadPuertosSerial"',
      'ec."cantidadCamaraWeb"',
      'ec."cantidadMicrofono"',
      'tae."tipo" AS tipo_almacenamiento_extraible',
      'ec."fechaVencimientoGarantia"',
      'ec.complemento AS complemento',
      'ec."cantidadPuertosMiniHDMI"',
      'ec."cantidadPuertosTarjetaMemoria"',
      'ec."cantidadPuertosDIN5"',
      'ec."cantidadPuertosDIN6"',
      'ec."cantidadPuertosMiniDIN"',
      'ec.mac AS mac',
      'ec."cantidadPuertosParalelo"',
      'ec."cantidadPuertosDisplayPort"',
      'ec."cantidadPuertoSerialCom1"',
      'u."nombreEmpleado"',
      'ua."nombreUnidad" AS unidad_academica',
      'd."nombreDepartamento" AS departamento',
    ])
    .where('u."idEmpleado" = :userId', { userId })
    .getRawMany();
};
