'use client';  // For Next.js App Router

import React from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  useInstantSearch,
} from 'react-instantsearch';
import searchClient from '../../../../lib/meilisearch/search-client';  // Adjust path
import  ProductPreview from '../../../../modules/products/components/product-preview';  // Your product component

function Hit({ hit }: { hit: any }) {
  return (
    <article key={hit.id} className="p-4 border-b hover:bg-gray-50">
      <h3 className="text-lg font-semibold">
        <Highlight attribute="title" hit={hit} />
      </h3>
      {hit.description && (
        <p className="text-sm text-gray-600 mt-1">{hit.description}</p>
      )}
      <div className="mt-3">
        <ProductPreview product={hit} region={hit.region} />
      </div>
    </article>
  );
}

export const SearchView = () => (
  <InstantSearch
    searchClient={searchClient}
    indexName={process.env.NEXT_PUBLIC_SEARCH_INDEX_NAME!}
  >
    <SearchBox
      placeholder="Search products..."
      className="search-input"
    />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);