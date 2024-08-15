import { useState } from "react"

// components
import Search from "./Search"

import SearchResults from "./SearchResults"

export default function Home() {
    const [searchResults, setSearchResults] = useState([])

    console.log(searchResults)

    return (
        <div className="m-page">
            <Search setSearchResults={setSearchResults} />
            {searchResults.length !== 0 &&
                <SearchResults searchResults={searchResults} />
            }
        </div>
    )
}
