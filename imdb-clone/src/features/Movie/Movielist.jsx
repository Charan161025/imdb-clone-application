import React, { useContext, useEffect, useState } from "react";
import MovieInfo from "./MovieInfo";
import { MovieContext } from "../../Context/MovieContextWrapper";

const MovieList = ({ movies }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showIntroPrompt, setShowIntroPrompt] = useState(false);

  const { watchList, addToWatchList, removeFromWatchList } =
    useContext(MovieContext);

  const isInWatch = (movie) => !!watchList.find((m) => m?.id === movie?.id);

  const handleOpenModal = (movie) => {
    setOpenModal(true);
    setSelectedMovie(movie);
    document.documentElement.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMovie(null);
    document.documentElement.style.overflow = "";
  };

  const isLongInfo = (movie) => {
    if (!movie) return false;
    const len = movie?.overview?.length ?? 0;
    return len > 300; 
  };

  const selectedNeedsFloatingClose = isLongInfo(selectedMovie);

  useEffect(() => {
    const seen = localStorage.getItem("movieIntroSeen");
    if (!seen) {
      setShowIntroPrompt(true);
      localStorage.setItem("movieIntroSeen", "true");
    }
  }, []);

  const dismissIntro = () => {
    setShowIntroPrompt(false);
  };

  return (
    <>
      {showIntroPrompt && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              
            }
          }}
        >
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 max-w-lg w-full bg-black/90 text-white rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-3 text-center">How Movie Cards Work</h2>

            <div className="text-sm leading-relaxed space-y-2 mb-4">
              <p>
                <strong>Tap any movie card</strong> to open its details in a single frame.
              </p>

              <p>
                Each movie detail frame contains three stacked elements:
                <ul className="list-disc ml-5 mt-1">
                  <li><strong>Info</strong> — title, release, rating, description</li>
                  <li><strong>Trailer</strong> — plays inside the same box</li>
                  <li><strong>Close</strong> — closes the frame</li>
                </ul>
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={dismissIntro}
                className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full min-h-screen flex flex-wrap justify-center gap-4 bg-[#0f0f0f]">
        {movies?.length > 0 &&
          movies.map((movie, index) => {
            const inWatch = isInWatch(movie);

            return (
              <div key={movie.id ?? index} className="w-[200px]">
                <div
                  className="
                    relative h-[30vh] bg-black/70 bg-cover bg-center rounded-xl overflow-hidden
                    transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 hover:shadow-xl
                    group
                  "
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                  }}
                  onClick={() => handleOpenModal(movie)}
                >
                  <div
                    className="
                      absolute top-2 left-2 z-20 opacity-0 -translate-y-1
                      group-hover:opacity-100 group-hover:translate-y-0 transition-all
                    "
                    aria-hidden={!movie?.vote_average}
                  >
                    <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-lg shadow-sm">
                      ⭐ {movie?.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"}
                    </div>
                  </div>

                  <div
                    className="absolute top-2 right-2 z-30 h-8 w-8 rounded-full bg-black/70 flex items-center justify-center cursor-pointer hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      inWatch ? removeFromWatchList(movie) : addToWatchList(movie);
                    }}
                    title={inWatch ? "Remove from Watchlist" : "Add to Watchlist"}
                  >
                    {inWatch ? (
                      <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="h-5 w-5">
                        <circle cx="12" cy="12" r="9" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                    ) : (
                      <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="h-5 w-5">
                        <circle cx="12" cy="12" r="9" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 text-center">
                    <h3 className="text-white text-sm leading-tight line-clamp-2">
                      <span className="block text-xs opacity-80 -mb-0.5">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : ""}
                      </span>
                      {movie.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 w-[min(95vw,900px)] max-h-[90vh]">
            <div className="bg-black/95 text-white rounded-lg shadow-xl p-4 max-h-[90vh] overflow-y-auto relative">
              {selectedNeedsFloatingClose && (
                <button
                  onClick={handleCloseModal}
                  aria-label="Close"
                  className="absolute right-3 top-3 z-50 h-10 w-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30"
                >
                  ✕
                </button>
              )}

              <MovieInfo
                movie={selectedMovie}
                handleCloseModal={handleCloseModal}
                floatingClose={selectedNeedsFloatingClose}
                dark
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieList;