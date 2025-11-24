import { PartialType } from "@nestjs/mapped-types";
import { CreateResolucionPantallaDto } from "./create-resolucion-pantalla.dto";


export class UpdateResolucionPantallaDto extends PartialType(CreateResolucionPantallaDto) {}