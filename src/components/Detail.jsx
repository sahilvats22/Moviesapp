import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";
import noimage from '../assets/images/movies.jpg'
import { FaPlay } from "react-icons/fa";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import slugify from 'react-slugify';
import { options } from '../../constant';

export const Detail = () => {
  const APIKEY = import.meta.env.VITE_API_KEY;

  const { loader, setLoader } = useContext(Contextpage);

  const { id } = useParams()

  const [moviedet, setMoviedet] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`,
      options
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
    setMoviegenres(moviedetail.genres);
    setLoader(false);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language`,
      options
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
    setLoader(false);
  }

  const fetchVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`,
      options
    );
    const videodata = await data.json();
    setVideo(videodata.results);
  }

  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

  return (
    <>
      {
        loader ? <div className='h-screen w-full flex justify-center items-center'><span className="loader m-10"></span></div> :
          <>
            <button onClick={() => history.back()} className='fixed z-10 text-4xl text-white bg-gray-800 m-3 md:m-5 rounded-full p-2 shadow-lg hover:bg-gray-700 transition'>
              <HiChevronLeft />
            </button>

            <div className='relative h-auto md:h-[82vh] flex justify-center items-center'>
              <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70'></div>
              <h1 className='text-white absolute bottom-5 p-10 text-2xl md:text-6xl font-bold text-center z-10'>{moviedet.title}</h1>
              {moviedet.backdrop_path === null ? <img src={noimage} className='h-full w-full object-cover' /> : <img src={"https://image.tmdb.org/t/p/original/" + moviedet.backdrop_path} className='h-full w-full object-cover' />}
            </div>

            <h2 className='text-white text-center pt-5 px-3 md:px-60 text-lg md:text-xl font-light'>{moviedet.overview}</h2>

            <div className='text-white font-medium my-3 flex justify-center'>
              <h2 className='bg-blue-600/30 border-2 border-blue-700 py-2 px-4 rounded-full'>Release Date: {moviedet.release_date}</h2>
            </div>

            <div className='flex justify-center flex-wrap'>
              {moviegenres.map((tag) => (
                <div key={tag.id} className='text-white font-medium bg-gray-800 rounded-full px-4 py-1 m-2'>
                  {tag.name}
                </div>
              ))}
            </div>

            <div className='flex flex-col items-center'>
              <h1 className="text-3xl text-blue-300 font-semibold text-center p-2">Cast</h1>
              <div className="md:px-5 flex flex-row my-5 max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 pb-3">
                {castdata.map((cast) => (
                  cast.profile_path && (
                    <div key={cast.id} className='flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1'>
                      <LazyLoadImage effect='blur' src={"https://image.tmdb.org/t/p/w500" + cast.profile_path} className="w-full h-full rounded-xl shadow-md" />
                      <p className='text-white mt-2'>{cast.name}</p>
                      <p className='text-blue-300'>({cast.character})</p>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div className='flex justify-center items-center mb-10 gap-5 flex-wrap'>
              {video.filter(trail => trail.type === "Trailer").map((trail, index) => (
                <a key={trail.id} href={'https://www.youtube.com/watch?v=' + trail.key} target="_blank" rel="noopener noreferrer" className='flex border-2 border-red-600 bg-red-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white transition hover:bg-red-600 hover:border-red-700'>
                  <FaPlay /> Watch Trailer {video.filter(trail => trail.type === "Trailer").length > 1 ? index + 1 : ""}
                </a>
              ))}
            </div>

            <div className='flex justify-center items-center mb-10 gap-5 flex-wrap'>
              <Link to={`/player/${id}/${slugify(moviedet.title)}`} className='flex border-2 border-green-600 bg-green-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white transition hover:bg-green-600 hover:border-green-700'>
                <FaPlay /> Watch Movie
              </Link>
            </div>
          </>
      }
    </>
  )
}
