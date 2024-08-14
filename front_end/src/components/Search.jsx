import { useState } from 'react';

export default function Search({ setSearchResults }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(e.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

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
        console.log('Search results:', data);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  return (
    <div className='w-fit'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='font text-black'>
          <input className='rounded outline-none' type="text" name="name" placeholder="Search" />
          <h3 className='text'>Attributes</h3>
          <div className='flex flex-col gap-2'>
            <input className='rounded outline-none' type="text" name="department" placeholder="Search by Department" />
            <input className='rounded outline-none' type="text" name="hardwareType" placeholder="Search by Hardware Type" />
            <input className='rounded outline-none' type="text" name="location" placeholder="Search by Location" />
            <input className='rounded outline-none' type="text" name="os" placeholder="Search by Operating System" />
            <input className='rounded outline-none' type="text" name="otherId" placeholder="Search by Other ID" />
            <input className='rounded outline-none' type="text" name="owningUnit" placeholder="Search by Owning Unit" />
            <input className='rounded outline-none' type="text" name="poNumber" placeholder="Search by PO Number" />
            <input className='rounded outline-none' type="text" name="purchaseDate" placeholder="Search by Purchase Date" />
            <input className='rounded outline-none' type="text" name="serialNumber" placeholder="Search by Serial Number" />
            <input className='rounded outline-none' type="text" name="userId" placeholder="Search by User ID" />
            <input className='rounded outline-none' type="text" name="warrantyDate" placeholder="Search by Warranty Date" />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
