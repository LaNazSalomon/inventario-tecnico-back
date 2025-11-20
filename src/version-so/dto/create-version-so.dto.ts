import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateVersionSoDto {
  @IsString()
  @IsNotEmpty()
  version: string;

  @IsUUID()
  @IsNotEmpty()
  sistemaOperativoId: string;
}