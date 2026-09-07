import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    MONGODB_URI: z.string().url('Invalid MongoDB URI'),
    REDIS_URL: z.string().url('Invalid Redis URL'),
    JWT_SECRET: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

const parseEnv = (): Env => {
  const env = process.env;

  try {
    const parsed = envSchema.parse(env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
      });
    }
    throw new Error('Failed to parse environment variables');
  }
};

export const envConfig = parseEnv();

// Export individual env variables for convenience
export const {
  NODE_ENV,
  PORT,
  MONGODB_URI,
  REDIS_URL,
  JWT_SECRET,
} = envConfig;
