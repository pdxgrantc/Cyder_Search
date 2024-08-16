import { useState } from "react";

import { FaSearch as SearchIcon } from "react-icons/fa";
import { IoMdCheckboxOutline as CheckedBox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank as UncheckedBox } from "react-icons/md";


export default function Search({ setSearchResults, setNextPage }) {
  const [isChecked, setIsChecked] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(e.target);
    const formObject = {};

    // Convert FormData to a plain object
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Add the checkbox value to the form object
    formObject['limitToForestry'] = isChecked;

    // Send the form data as JSON in a POST request
    fetch('http://localhost:3000/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.results); // Directly set the results
        if (data.next) {
          setNextPage(data.next); // Set the next page
        } else {
          setNextPage(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  return (
    <div className='w-fit'>
      <form className='grid grid-cols-3 gap-x-5 gap-y-2 font text-black' onSubmit={handleSubmit}>
        <h2 className='text col-span-3 font-semibold text-xxl'>Search by System Name</h2>
        <input className='rounded outline-none col-span-2 text-xl px-2 py-.5' type="text" name="name" placeholder="Search by Name" />
        <button className="w-full flex items-center justify-center gap-4 col-span-1 rounded bg-white font-semibold text-xl px-2" type="submit">
          <p className="py-.5">Search</p>
          <SearchIcon className="h-[22px] w-auto" />
        </button>
        <h3 className='text col-span-3 font-semibold text-xl'>Search by Attribute</h3>
        <input className='rounded outline-none px-2 py-.5' type="text" name="department" placeholder="Department" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="hardwareType" placeholder="Hardware Type" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="location" placeholder="Location" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="os" placeholder="Operating System" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="otherId" placeholder="Other ID" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="owningUnit" placeholder="Owning Unit" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="poNumber" placeholder="PO Number" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="purchaseDate" placeholder="Purchase Date" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="serialNumber" placeholder="Serial Number" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="userId" placeholder="User ID" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="warrantyDate" placeholder="Warranty Date" />
        <label htmlFor="limitToForestry" className="flex items-center gap-2 bg-white rounded cursor-pointer px-2 py-.5">

          <input
            type="checkbox"
            name="limitToForestry"
            id="limitToForestry"
            onChange={() => setIsChecked((prev) => !prev)}
            checked={isChecked}
            style={{ display: 'none' }} // Hide the default checkbox
          />
          {isChecked ? <CheckedBox /> : <UncheckedBox />} {/* Render the appropriate icon */}
          Limit to Forestry
        </label>
      </form>
    </div>
  );
}

/*
<div
          className="flex items-center gap-2 bg-white rounded px-2 py-0.5 cursor-pointer"
          onClick={handleCheckboxClick}
        >
          <input className="hidden" type="checkbox" name="limitToForestry" id="limitToForestry" checked={isChecked} />
          <label htmlFor="limitToForestry" className="text-black cursor-pointer flex items-center gap-2">
            Limit to Forestry
            {isChecked ? <CheckedBox className="checked-icon" /> : <UncheckedBox className="unchecked-icon" />}
          </label>
        </div>
        */