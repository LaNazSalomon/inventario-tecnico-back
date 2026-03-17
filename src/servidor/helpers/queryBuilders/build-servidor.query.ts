import { Repository } from 'typeorm';
import { Servidor } from '../../entities/servidor.entity';

export const buildServidorQuery = (
  repo: Repository<Servidor>,
  usuarioId: string,
) => {
  return repo
    .createQueryBuilder('s')
    .innerJoin('s.marca', 'ma')
    .innerJoin('s.modelo', 'mo')
    .innerJoin('s.tipoProcesador', 'tp')
    .innerJoin('s.modeloProcesador', 'mp')
    .innerJoin('s.versionSO', 'vso')
    .innerJoin('s.estadoFuncionamiento', 'ef')
    .innerJoin('s.empleado', 'u')
    .innerJoin('s.departamento', 'd')
    .innerJoin('s.unidadAcademica', 'ua')
    .select([
      's."idServidor" AS id',
      's."tipo_servidor" AS tipo_servidor',
      'ma."nombre" AS marca',
      'mo."nombre" AS modelo',
      'tp."nombre" AS tipo_procesador',
      'mp."nombre" AS modelo_procesador',
      's."velocidadProcesador"',
      's."nucleosProcesador"',
      's."cantidadProcesadores"',
      's."cantidadMaxProcesadores"',
      's."capacidadRAM"',
      's."capacidadMaxRAM"',
      's."capacidadAlmacenamiento"',
      's."porcentajeUsoAlmacenamiento"',
      's."sistemaOperativo"',
      'vso."version" AS version_so',
      's."arquitecturaSO"',
      's."estadoLicenciaSO"',
      's."tipoConexion"',
      's."direccionIPInterna"',
      's."direccionIPExterna"',
      's."rol"',
      's."proposito"',
      's."criticidad"',
      's."puertosAbiertos"',
      's."aplicaBalanceoCarga"',
      's."politicaRespaldo"',
      's."tipoPoliticaRespaldo"',
      's."periodicidadRespaldo"',
      's."serie"',
      's."fechaVencimientoGarantia"',
      'ef."estado" AS estado_funcionamiento',
      'u."nombreEmpleado"',
      'd."nombreDepartamento" AS departamento',
      'ua."nombreUnidad" AS unidad_academica',
    ])
    .where('u."idEmpleado" = :usuarioId', { usuarioId })
    .getRawMany();
};
