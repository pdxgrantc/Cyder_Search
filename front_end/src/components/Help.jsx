import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';


const Help = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Cyder Search - Help</title>
      </Helmet>


      <h1 className='text-lheader font-semibold'>Help</h1>
      <div className='flex flex-col gap-5'>
        <div>
          <h2 className='text-subheader font-semibold'>Search Limitations</h2>
          <p>This webpage uses the Cyder API which is limited in how it can search for devices by name or attribute. These limitations are unavoidable based on API architecture. More information can be found&nbsp;
            <a className="text-white" href="https://is.oregonstate.edu/service/cyder" target="_blank" rel="noopener noreferrer">here</a>
            .
          </p>
        </div>
        <div>
          <h3 className='text-xxl font-semibold'>Search by Name Limitations</h3>
          <p>Searching by name is case sensitive for instance the search terms "FOR-CHUCKY" and "FOR-Chucky" will not pull the same results. Thankfully the Cyder API does support searching buy sub-strings this means that "FOR-" will return all device names with "FOR-" somewhere in their name.</p>
        </div>
        <div>
          <h3 className='text-xxl font-semibold'>Search by Attribute Limitations</h3>
          <p>Searching by attribute works essentially opposite to searching by name. Attribute search will not find substrings so the serial number search for "909GKR3" and "909G" do not return the same values; in addition to the lack of substring search you have to specify the full attribute name this means that if a device has the serial number "909GKR3" searching for "909G" will not return that device. Capitalization in this case does not matter so the serial numbers "909GKR3" and "909gkr3" are considered equivalent. </p>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default Help
