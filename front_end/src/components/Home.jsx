import { useState } from "react"

// components
import Search from "./Search"

import SearchResults from "./SearchResults"

export default function Home() {
    const [searchResults, setSearchResults] = useState([])

    return (
        <div className="m-page flex flex-col gap-5">
            <Search setSearchResults={setSearchResults} />
            {searchResults.length !== 0 &&
                <SearchResults searchResults={searchResults} />
            }
        </div>
    )
}
