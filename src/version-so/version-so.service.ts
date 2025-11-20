import { Injectable } from '@nestjs/common';
import { CreateVersionSoDto } from './dto/create-version-so.dto';
import { UpdateVersionSoDto } from './dto/update-version-so.dto';

@Injectable()
export class VersionSoService {
  create(createVersionSoDto: CreateVersionSoDto) {
    return 'This action adds a new versionSo';
  }

  findAll() {
    return `This action returns all versionSo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} versionSo`;
  }

  update(id: number, updateVersionSoDto: UpdateVersionSoDto) {
    return `This action updates a #${id} versionSo`;
  }

  remove(id: number) {
    return `This action removes a #${id} versionSo`;
  }
}
