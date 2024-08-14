import React from 'react'

export default function SearchResults({ searchResults }) {
  return (
    <>
      <p>Search Results</p>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))
        }
      </ul>
    </>
  )
}
