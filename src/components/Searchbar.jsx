import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Contextpage from '../Contextpage';
import { useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';

function Searchbar() {
    const { filteredGenre, fetchSearch, setBackGenre, setGenres, user } = useContext(Contextpage);
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const [typingTimeout, setTypingTimeout] = useState(null);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        // Set showSearch based on user login status
        setShowSearch(user !== null);
    }, [user]);

    const handleSearch = () => {
        // Clear the previous timeout to prevent premature execution
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout
        const newTimeout = setTimeout(() => {
            onKeyUp(value);
        }, 500); // Adjust the timeout duration as needed (in milliseconds)

        setTypingTimeout(newTimeout);
    };

    const onKeyUp = (query) => {
        // console.log(query)
        if (query !== "") {
            query = query.trim();

            if (query === "") {
                navigate("/");
            } else {
                navigate(`/search/${slugify(query)}`)
            }
        }
    };

    return (
        <>
            {showSearch && ( // Conditionally render the search bar
                <div className="searchbar-container w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 h-[10rem] md:h-[12rem]">
                    <Helmet>
                        <title>Movies</title>
                    </Helmet>
                    <div className='searchbar-content h-full w-full bg-black/30 flex justify-center items-center'>
                        <input
                            type="search"
                            name="searchpanel"
                            id="searchpanel"
                            placeholder='Search Movie'
                            className='search-input p-3 w-full mx-10 md:w-[40rem] rounded-xl outline-none text-white text-xl font-semibold bg-transparent border-2 border-white placeholder-white'
                            onKeyUp={(e) => handleSearch()}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Searchbar;

