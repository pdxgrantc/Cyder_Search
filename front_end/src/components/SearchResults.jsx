import React from 'react'

export default function SearchResults({ searchResults }) {
  return (
    <>
      <table className='w-full'>
        <thead>
          <tr>
            <th>Name</th>
            <th>System Type</th>
            <th>Location</th>
            <th>Owner</th>
            <th>Tags</th>
          </tr>
        </thead>
      </table>
      <p>Search Results</p>
      <ul className='grid grid-cols-1 w-fit gap-y-10'>
        {searchResults.map((result) => (
          <DropdownItem key={result.id} item={result} />
        ))
        }
      </ul>
    </>
  )
}

function DropdownItem({ item }) {
  return (
    <li>
      <div className='flex gap-5 justify-between'>
        <h3>{item.name}</h3>
        <a href={"https://cyder.oregonstate.edu/core/system/" + item.id} target="_blank" rel="noopener noreferrer">View in Cyder</a>
      </div>
      <div>
        {item.systemav_set.length === 0 ? <p>No properties</p> :
          <>
            {item.systemav_set.map((property) => (
              <p key={property.id}>{property.attribute}: {property.value}</p>
            ))}
          </>
        }
      </div>
    </li>
  )
}
