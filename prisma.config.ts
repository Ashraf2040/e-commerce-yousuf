// prisma.config.ts (or prisma/prisma.config.ts if inside prisma folder)

import 'dotenv/config'; // ← This loads .env variables
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma', // adjust path if needed

  migrations: {
    seed: 'tsx prisma/seed.ts',
  },

  datasource: {
    url: env('DATABASE_URL'), // ← This is now the ONLY place for the DB URL
  },
});