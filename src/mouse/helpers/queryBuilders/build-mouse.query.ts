import { Mouse } from 'src/mouse/entities/mouse.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

export const buildMouseQuery = (
  repo: Repository<Mouse>,
  usuarioId: string,
) => {
  return repo
    .createQueryBuilder('m')
    .innerJoin('m.estado', 'ef')
    .innerJoin('m.empleado', 'u')
    .innerJoin('m.equipo', 'ec')
    .innerJoin('m.departamento', 'd')
    .innerJoin('m.unidadAcademica', 'ua')
    .select([
      'm."idMouse" AS id',
      'm.numeroInventario AS numeroInventario',
      'm.marca AS marca',
      'm.modelo AS modelo',
      'm."tipoConector"',
      'm.mecanismo AS mecanismo',
      'm.serie AS serie',
      'm."fechaVencimientoGarantia"',
      'ef."estado" AS estado_funcionamiento',
      'u."nombreEmpleado"',
      'ec."inventario" AS equipo_asignado',
      'd."nombreDepartamento" AS departamento',
      'ua."nombreUnidad" AS unidad_academica',
    ])
    .where('u."idEmpleado" = :usuarioId', { usuarioId })
    .getRawMany();
};
