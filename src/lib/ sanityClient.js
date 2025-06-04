import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'fvw3vlt5', // ← à copier depuis sanity.json ou sanity.config.ts
  dataset: 'production',
  apiVersion: '2023-01-01', // Date du schéma
  useCdn: true, // Utilise le cache Sanity (très rapide pour lecture seule)
});
