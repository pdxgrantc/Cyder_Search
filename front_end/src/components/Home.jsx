import { useState } from "react"

// components
import Search from "./Search"
import SearchResults from "./SearchResults"

export default function Home() {
    const [searchResults, setSearchResults] = useState([])
    const [nextPage, setNextPage] = useState(null)

    const fetchNextPage = async () => {
        const encodedNextPage = encodeURIComponent(nextPage);
        fetch(`http://localhost:3000/api/nextpage?arg=${encodedNextPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setSearchResults((prevResults) => [...prevResults, ...data.results])
                if (data.next) {
                    setNextPage(data.next)
                } else {
                    setNextPage(null)
                }
            })
            .catch((error) => {
                console.error('Error fetching search results:', error)
            })
    }

    return (
        <div className="m-page flex flex-col gap-5">
            <Search setSearchResults={setSearchResults} setNextPage={setNextPage} />
            {searchResults.length !== 0 &&
                <SearchResults searchResults={searchResults} />
            }
            <div>
                {nextPage &&
                    <button onClick={fetchNextPage} className="btn btn-primary">Load More</button>
                }
            </div>
        </div>
    )
}