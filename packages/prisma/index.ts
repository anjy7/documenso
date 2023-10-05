import { PrismaClient } from '@prisma/client';

import { getDatabaseUrl } from './helper';

declare global {
  // We need `var` to declare a global variable in TypeScript
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

if (!globalThis.prisma) {
  globalThis.prisma = new PrismaClient({ datasourceUrl: getDatabaseUrl() });
}

export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    datasourceUrl: 'postgres://documenso:password@127.0.0.1:54320/documenso',
  });

export const getPrismaClient = () => prisma;
