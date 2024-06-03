import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import noimage from '../assets/images/no-image.jpg';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Contextpage from '../Contextpage';

function Moviecard({ movie }) {
    const { user } = useContext(Contextpage);

    const [isBookmarked, setIsBookmarked] = useState(null);

    useEffect(() => {
        if (localStorage.getItem(movie.id)) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [movie.id]);

    const BookmarkMovie = () => {
        if (!user) {
            toast.info("To bookmark this movie, please log in.");
        } else {
            setIsBookmarked(!isBookmarked);
            if (isBookmarked) {
                localStorage.removeItem(movie.id);
            } else {
                localStorage.setItem(movie.id, JSON.stringify(movie));
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            layout
            className="movie-card relative w-full md:w-60 h-[410px] md:h-[360px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl overflow-hidden shadow-lg bg-gray-800"
        >
            {/* Bookmark buttons */}
            <button className={`absolute bg-transparent text-white p-2 z-20 right-0 m-3 rounded-full text-2xl transition duration-300 ease-in-out hover:text-yellow-500 focus:outline-none ${isBookmarked ? 'text-yellow-500' : ''}`} onClick={BookmarkMovie}>
                {isBookmarked ? <AiFillStar /> : <AiOutlineStar />}
            </button>

            <div className="absolute bottom-0 w-full p-3 z-20">
                <h1 className="text-white text-lg font-semibold break-normal break-words">{movie.title || movie.name}</h1>

                <h1 className={`font-bold text-lg p-2 rounded-full bg-gray-900 ${movie.vote_average > 7 ? 'text-green-500' : movie.vote_average > 5.5 ? 'text-orange-400' : 'text-red-600'}`}>{movie.vote_average.toFixed(1)}</h1>
            </div>

            <Link to={`/moviedetail/${movie.id}`} className="absolute inset-0 z-10"></Link>

            <div>
                {movie.poster_path === null ? <img className="object-cover w-full h-full" src={noimage} alt="No Poster" /> : <LazyLoadImage effect="blur" className="object-cover w-full h-full" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || movie.name} />}
            </div>
        </motion.div>
    );
}

export default Moviecard;
