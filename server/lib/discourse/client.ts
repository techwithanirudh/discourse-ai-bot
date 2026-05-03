import { createClient } from '@hey-api/client-fetch';
import { env } from '~/env';

const url = env.DISCOURSE_URL;

export const client = createClient({
  baseUrl: url,
  headers: {
    'Api-Key': env.DISCOURSE_BOT_TOKEN,
    'Api-Username': env.DISCOURSE_BOT_USERNAME,
    'X-CF-Bot-Secret': env.CF_BOT_SECRET,
  },
});
