// src/lib/meilisearch/search-client.ts
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

// This is the correct way in 2025
const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_SEARCH_ENDPOINT!,
  process.env.NEXT_PUBLIC_SEARCH_API_KEY!,
  {
    // These options fix the type mismatch and improve performance
    finitePagination: true,
    primaryKey: 'id',
    keepZeroFacets: true,
  }
);

// This type assertion tells TypeScript: "Trust me, this is a valid Algolia-style client"
export default searchClient as any;
// OR (more precise, if you want to keep type safety elsewhere):
// export default searchClient as unknown as import('react-instantsearch').SearchClient;