import { Teclado } from 'src/teclado/entities/teclado.entity';
import { Repository } from 'typeorm/repository/Repository';

export const buildTecladoQuery = (
  repo: Repository<Teclado>,
  usuarioId: string,
) => {
  return repo
    .createQueryBuilder('t')
    .innerJoin('t.estado', 'ef')
    .innerJoin('t.empleado', 'u')
    .innerJoin('t.equipo', 'ec')
    .innerJoin('t.departamento', 'd')
    .innerJoin('t.unidadAcademica', 'ua')
    .select([
      't."idTeclado" AS id',
      't."numeroInventario"',
      't.marca AS marca',
      't.modelo AS modelo',
      't."tipoConector"',
      't.serie AS serie',
      't."fechaVencimientoGarantia"',
      'ef."estado" AS estado_funcionamiento',
      'u."nombreEmpleado"',
      'ec."inventario" AS equipo_asignado',
      'd."nombreDepartamento" AS departamento',
      'ua."nombreUnidad" AS unidad_academica',
    ])
    .where('u."idEmpleado" = :usuarioId', { usuarioId })
    .getRawMany();
};
