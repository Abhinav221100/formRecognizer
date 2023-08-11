import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library for making HTTP requests

 

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        if (searchQuery) {
            try {
                if(!searchQuery || searchQuery === " "){
                    setSearchQuery("*");
                }
                // Make a GET request to your Azure Cognitive Search service
                const response = await axios.get(
                `https://azcognitivesearchservice.search.windows.net/indexes/azureblob-index/docs`,
                
                {
                    params: {
                    'api-version': '2023-07-01-Preview',
                    search: searchQuery,
                    },
                    headers: {
                    'Content-Type': 'application/json',
                    'api-key': '1QgaHM2GOLCUlJbIaR056yopOWfKQM2BNuJTbyYh88AzSeBvD4y1',
                    },
                }
                );
                console.log(response);
            // Update the search results state with the received data
                setSearchResults(response.data.value);

            } catch (error) {
                console.error('Error performing search:', error);
            }

        }
    };

    return (
        <div>
            <h2>Search Page</h2>
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Enter search query"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {searchResults.length > 0 && (
                <div>
                    <h3>Search Results:</h3>
                    <ul>
                        {searchResults.map((result, index) => (
                        <li key={index}>
                            {/* Display relevant properties from the search result */}
                            Document ID: {index}<br />
                            KeyPhrases: {result.keyphrases.join(" | ")}
                            <br />
                            <hr></hr>
                            {/* Add more properties as needed */}
                        </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchPage;