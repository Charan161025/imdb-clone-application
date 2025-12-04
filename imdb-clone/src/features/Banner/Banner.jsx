import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import Spinner from "../../Components/Spinner";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
  const TMDB_TRENDING_MOVIE_BASE_URL =
    import.meta.env.VITE_TRENDING_MOVIES_BASE_URL;

  useEffect(() => {
    let mounted = true;

    const fetchMovies = async () => {
      setLoader(true);
      try {
        const url = `${TMDB_TRENDING_MOVIE_BASE_URL}?api_key=${TMDB_API_KEY}`;
        const { data } = await axios.get(url);

        if (!mounted) return;

        const movieData = (data?.results ?? []).slice(0, 5);

        setMovies(
          movieData.map((movie) => ({
            id: movie?.id,
            title: movie?.title ?? movie?.name ?? "Untitled",
            bannerImage:
              movie?.backdrop_path
                ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                : movie?.poster_path
                ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                : "/placeholder-banner.jpg",
          }))
        );

        setCurrentIndex(0);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        if (mounted) setLoader(false);
      }
    };

    fetchMovies();
    return () => {
      mounted = false;
    };
  }, [TMDB_API_KEY, TMDB_TRENDING_MOVIE_BASE_URL]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  return (
    <div>
      {loader ? (
        <div className="w-full flex justify-center items-center py-16">
          <Spinner />
        </div>
      ) : (
        movies.length > 0 && (
          <div className="relative w-full overflow-hidden">

           
            <div
              className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-700 z-0"
              style={{
                backgroundImage: `url(${movies[currentIndex].bannerImage})`,
                backgroundPosition: "center 35%",
              }}
            />

            
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-10" />
            <div className="relative z-20 h-[40vh] md:h-[55vh] lg:h-[65vh] flex items-end justify-center pb-12 px-4">

              <div
                className="
                  inline-flex items-center justify-center
                  bg-[#0b0b0b]/90
                  px-6 py-2
                  rounded-full
                  shadow-[0_8px_20px_rgba(0,0,0,0.6)]
                "
              >
                <h2
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  className="
                    text-white 
                    text-xl md:text-2xl lg:text-3xl
                    font-semibold
                    tracking-wide
                    text-center
                    leading-tight
                    m-0
                  "
                >
                  {movies[currentIndex].title}
                </h2>
              </div>
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-transform"
            >
              <ArrowBigLeftDash className="w-6 h-6 text-black" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-transform"
            >
              <ArrowBigRightDash className="w-6 h-6 text-black" />
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Banner;