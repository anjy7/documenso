/// <reference types="@documenso/tsconfig/process-env.d.ts" />

export const getDatabaseUrl = () => {
  return 'postgres://documenso:password@127.0.0.1:54320/documenso';

  // We change the protocol from `postgres:` to `https:` so we can construct a easily
  // mofifiable URL.
  const url = new URL(process.env.NEXT_PRIVATE_DATABASE_URL.replace('postgres://', 'https://'));

  // If we're using a connection pool, we need to let Prisma know that
  // we're using PgBouncer.
  if (process.env.NEXT_PRIVATE_DATABASE_URL !== process.env.NEXT_PRIVATE_DIRECT_DATABASE_URL) {
    url.searchParams.set('pgbouncer', 'true');

    process.env.NEXT_PRIVATE_DATABASE_URL = url.toString().replace('https://', 'postgres://');
  }

  // Support for neon.tech (Neon Database)
  if (url.hostname.endsWith('neon.tech')) {
    const [projectId, ...rest] = url.hostname.split('.');

    if (!projectId.endsWith('-pooler')) {
      url.hostname = `${projectId}-pooler.${rest.join('.')}`;
    }

    url.searchParams.set('pgbouncer', 'true');

    process.env.NEXT_PRIVATE_DATABASE_URL = url.toString().replace('https://', 'postgres://');
  }

  return process.env.NEXT_PRIVATE_DATABASE_URL;
};
