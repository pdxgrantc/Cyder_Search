import { FaSearch as SearchIcon } from "react-icons/fa";

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
      <form className='grid grid-cols-3 gap-x-5 gap-y-2 font text-black' onSubmit={handleSubmit}>
        <input className='rounded outline-none col-span-2 text-xl px-2 py-.5' type="text" name="name" placeholder="Search by Name" />
        <button className="w-full flex items-center justify-center gap-4 w-fit col-span-1 rounded bg-white font-semibold text-xl px-2" type="submit">
          <p className="py-.5">Search</p>
          <SearchIcon className="h-[22px] w-auto" />
        </button>
        <h3 className='text col-span-3'>Attributes</h3>
        <input className='rounded outline-none px-2 py-.5' type="text" name="department" placeholder="Search by Department" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="hardwareType" placeholder="Search by Hardware Type" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="location" placeholder="Search by Location" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="os" placeholder="Search by Operating System" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="otherId" placeholder="Search by Other ID" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="owningUnit" placeholder="Search by Owning Unit" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="poNumber" placeholder="Search by PO Number" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="purchaseDate" placeholder="Search by Purchase Date" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="serialNumber" placeholder="Search by Serial Number" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="userId" placeholder="Search by User ID" />
        <input className='rounded outline-none px-2 py-.5' type="text" name="warrantyDate" placeholder="Search by Warranty Date" />
      </form>
    </div>
  );
}
