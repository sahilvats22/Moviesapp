import React, { useEffect, useContext } from 'react';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';

function Upcoming() {
  const { loader, setPage, page, fetchUpcoming, upcoming, totalPage } = useContext(Contextpage);

  useEffect(() => {
    setPage(1); // Reset Page to 1 on initial render.
  }, []);

  useEffect(() => {
    if (page > 0) {
      fetchUpcoming();
    }
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Upcoming movies</title>
      </Helmet>

      <div className='w-full bg-gradient-to-r from-[#0f1217] to-[#10141e] md:p-10 mb-20 md:mb-0'>
        <Header />
        <motion.div
          layout
          className="flex flex-wrap justify-center md:justify-around gap-5 md:gap-10">
          <AnimatePresence>
            {
              loader ? (
                <span className="loader m-10"></span>
              ) : (
                <InfiniteScroll
                  className="w-full md:p-2 flex flex-wrap justify-center md:justify-around"
                  dataLength={upcoming.length} // This is important field to render the next data
                  next={() => setPage(page + 1)}
                  hasMore={page < totalPage}
                  loader={<span className="loader m-10"></span>}
                  scrollThreshold={0.9}
                  style={{ overflow: 'hidden' }}
                >
                  {upcoming.map((upc) => (
                    <Moviecard key={upc.id} movie={upc} />
                  ))}
                </InfiniteScroll>
              )
            }
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default Upcoming;
