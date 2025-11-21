import { PartialType } from "@nestjs/mapped-types";
import { CreateEstadoFuncionamientoDto } from "./create-estado-funcionamiento.dto";

export class UpdateEstadoFuncionamientoDto extends PartialType( CreateEstadoFuncionamientoDto){}

