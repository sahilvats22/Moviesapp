import React, { useEffect, useContext } from 'react';
import Contextpage from '../Contextpage';
import { Helmet } from "react-helmet";

function Genre() {
    const { fetchGenre, activegenre, setActiveGenre, genres } = useContext(Contextpage);    

    useEffect(() => {
        fetchGenre();  // Fetching Genres on Initial Render.
    }, [])

    return (
        <>
            <Helmet>
                <title>Genres</title>
            </Helmet>

            <div className='flex flex-wrap justify-center px-4 py-4'>
                {
                    genres.map((genre) => (
                        <button
                            onClick={() => setActiveGenre(genre.id)}
                            className={`px-6 py-2 m-2 text-[15px] font-semibold rounded-full transition 
                            ${activegenre === genre.id ? 'bg-blue-600 text-white shadow-lg transform scale-105' : 'bg-gray-700 text-white hover:bg-blue-500 hover:shadow-md'}`}
                            key={genre.id}>
                            {genre.name}
                        </button>
                    ))
                }
            </div>
        </>
    )
}

export default Genre;
