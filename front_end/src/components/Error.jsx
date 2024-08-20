import React from 'react'

import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div>
        <h1 className='font-bold text-xlheader'>404 Not Found</h1>
        <Link to="/" className="text-header font-semibold relative after:content-[''] after:absolute after:w-0 after:h-[3px] after:bg-white after:left-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Return to Home</Link>
    </div>
  )
}
