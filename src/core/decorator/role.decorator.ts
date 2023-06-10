import { SetMetadata } from '@nestjs/common';

/**
 * @param roles  a set of expected roles user must have to access controller
 * @returns Creates a decorator that allows us specifiy user roles
 */
export const Role = (...roles: string[]) => SetMetadata('roles', roles);
