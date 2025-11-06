import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ManejadorErroresDB {
  public static erroresDB(error: any, nameClass: string): never {
    const logger: Logger = new Logger(nameClass);

    if (error.code === '23505') throw new BadRequestException(error.detail);

    if (error.code === '23503') throw new BadRequestException(error.detail);

    if (error.code === '23502') throw new BadRequestException(error.detail);

    logger.error(error);
    throw new InternalServerErrorException(
      'Error inesperado, por favor revise los logs del server',
    );
  }
}
