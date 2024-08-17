import { useState } from "react"
import { Helmet, HelmetProvider } from 'react-helmet-async';

// components
import Search from "./Search"
import SearchResults from "./SearchResults"

const Home = () => {
    const [searchResults, setSearchResults] = useState([])
    const [nextPage, setNextPage] = useState(null)

    const fetchNextPage = async () => {
        const encodedNextPage = encodeURIComponent(nextPage);
        fetch(`http://for-helpdesk-web.forestry.oregonstate.edu:3000/api/nextpage?arg=${encodedNextPage}`, {
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
        <HelmetProvider>
            <Helmet>
                <title>Cyder Search</title>
            </Helmet>
            <div className="flex flex-col gap-10">
                <Search setSearchResults={setSearchResults} setNextPage={setNextPage} />
                {searchResults.length !== 0 &&
                    <SearchResults searchResults={searchResults} />
                }
            </div>
            {nextPage &&
                <button onClick={fetchNextPage} className="my-5 ml-12 text-xl relative after:content-[''] after:absolute after:w-0 after:h-[2.5px] after:bg-white after:left-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Load More</button>
            }
        </HelmetProvider>
    )
}

export default Home
