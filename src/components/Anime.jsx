import React, { useEffect, useContext } from 'react';
import Contextpage from '../Contextpage';
import Moviecard from './Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Genre from './Genre';
import Header from './Header';
import InfiniteScroll from 'react-infinite-scroll-component';

function Anime() {
    const { movies, loader, page, setPage, totalPage, setMovies, activegenre, fetchAnime } = useContext(Contextpage);

    useEffect(() => {
        setPage(1);
    }, []);
    
    useEffect(() => {
        setMovies([]);
        setPage(0);
    }, [activegenre]);

    useEffect(() => {
        if (page > 0) {
            fetchAnime();
        }
    }, [page]);

    return (
        <div className='w-full bg-gradient-to-b from-gray-800 to-gray-900 md:p-10 mb-20 md:mb-0'>
            <Genre />
            <Header />
            <motion.div
                layout
                className="flex flex-wrap relative justify-center gap-6 md:gap-8 p-4 md:p-8">
                <AnimatePresence>
                    {loader ? (
                        <span className="loader m-10"></span>
                    ) : (
                        <>
                            <InfiniteScroll
                                className="w-full flex flex-wrap relative justify-center gap-6 md:gap-8"
                                dataLength={movies.length}
                                next={() => setPage(page + 1)}
                                hasMore={page < totalPage}
                                loader={<span className="loader m-10"></span>}
                                scrollThreshold={0.9}
                                style={{ overflow: 'hidden' }}
                            >
                                {movies.map((movie) => (
                                    <Moviecard key={movie.id} movie={movie} />
                                ))}
                            </InfiniteScroll>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default Anime;
