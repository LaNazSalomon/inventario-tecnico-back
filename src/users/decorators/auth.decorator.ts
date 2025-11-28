
import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleProtected } from './role-protected.decorator';
import { Roles } from 'src/common/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from '../guards/use-role.guard';

export function Auth(...roles: Roles[]) {
  return applyDecorators(

    RoleProtected( ...roles ),
    UseGuards(AuthGuard(), UseRoleGuard),

  );
}
