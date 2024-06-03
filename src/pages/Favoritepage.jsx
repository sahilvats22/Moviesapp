import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

function Favoritepage() {
    const { loader, GetFavorite } = useContext(Contextpage);
    const [localStorageData, setLocalStorageData] = useState([]);

    useEffect(() => {
        GetFavorite();

        const data = localStorage;
        setLocalStorageData(data);
    }, []);

    return (
        <>
            <Helmet>
                <title>BlueBird Movies | Favorite Movies</title>
            </Helmet>

            <div className='favorite-page-container w-full bg-gradient-to-b from-[#1e2536] to-[#10141e] md:p-10 mb-20 md:mb-0'>
                <Header />
                <motion.div
                    layout
                    className="movie-card-container w-full md:p-2 flex flex-wrap justify-evenly md:justify-around">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                    {
                                        Object.keys(localStorageData).filter(key => !isNaN(key)).length === 0 ?
                                            <p className="no-bookmark-text text-xl text-white">No Bookmarks Yet!</p>
                                            :
                                            Object.keys(localStorageData).filter(key => !isNaN(key)).map((key, index) => (
                                                <Moviecard key={index} movie={{ ...JSON.parse(localStorageData[key]) }} />
                                            ))
                                    }
                                </>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </>
    )
}

export default Favoritepage;
