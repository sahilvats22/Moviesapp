import React, { useEffect, useContext } from 'react';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import { HiChevronLeft } from "react-icons/hi";

function Search() {
    const { searchedMovies, loader } = useContext(Contextpage);
    const { query } = useParams();

    useEffect(() => {
        // Call fetchSearch(query) only once when the component mounts
        fetchSearch(query);
    }, [query]); // Only re-run if 'query' changes

    return (
        <section>
            <Link to="/" className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></Link>
            <div className='w-full bg-gradient-to-b from-[#1e2536] to-[#10141e] md:p-10 mb-20 md:mb-0'>
                <Header />
                <motion.div
                    layout
                    className="flex flex-wrap justify-center md:justify-around gap-5 md:gap-10">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                    {searchedMovies.map((movie) => (
                                        <Moviecard key={movie.id} movie={movie} />
                                    ))}
                                </>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

export default Search;
