import React, { useState, useRef } from 'react';

// Icons
import { LuChevronDown as OpenIcon } from "react-icons/lu";
import { LuChevronRight as ClosedIcon } from "react-icons/lu";
import { LuExternalLink as CyderLink } from "react-icons/lu";

export default function SearchResults({ searchResults }) {
  return (
    <div className='grid grid-cols-1 w-fit gap-y-10'>
      {searchResults.map((result) => (
        <SearchResultItem key={result.id} item={result} />
      ))
      }
    </div>
  )
}


const SearchResultItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex'>
        <div className='w-fit align-top text-right px-2'>
          <button onClick={toggleDropdown} className='float-right mt-2'>
            {isOpen ? <OpenIcon className='w-8 h-auto text-white' /> : <ClosedIcon className='w-8 h-auto' />}
          </button>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-5 justify-between text-xl'>
            <h3>{item.name}</h3>
            <a className='float-right mt-1' href={"https://cyder.oregonstate.edu/core/system/" + item.id} target="_blank" rel="noopener noreferrer">
              <CyderLink className='w-8 h-auto' />
            </a>
          </div>
        </div>
      </div>
      <div
        className={`dropdown-content ${isOpen ? 'open' : ''} pl-[50px]`}
        style={{ height: isOpen ? `${contentRef.current.scrollHeight}px` : '0px' }}
        ref={contentRef}
      >
        {item.systemav_set.length === 0 ? <p>No properties</p> :
          <>
            {item.systemav_set.map((property) => (
              <p key={property.id}>{property.attribute}: {property.value}</p>
            ))}
          </>
        }
      </div>
    </div>
  );
};
