import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner";

const MovieInfo = ({ movie = {}, handleCloseModal, floatingClose = false, dark = true }) => {
  const { id, title, poster_path, release_date, overview, vote_average } = movie;
  const [loader, setLoader] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    const fetchTrailer = async () => {
      try {
        setLoader(true);
        setTrailerUrl(null);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}`
        );
        if (cancelled) return;
        const trailerObj = (response?.data?.results || []).find(
          (v) => v?.type === "Trailer" && v?.site === "YouTube"
        );
        if (trailerObj) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailerObj.key}`);
        }
      } catch (err) {
        console.error("fetchTrailer error", err);
      } finally {
        if (!cancelled) setLoader(false);
      }
    };

    fetchTrailer();
    return () => {
      cancelled = true;
    };
  }, [id, TMDB_API_KEY]);

  const bgClass = dark ? "bg-black/95 text-white" : "bg-white text-black";
  const subTextClass = dark ? "text-gray-300" : "text-gray-600";
  const accentClass = "text-blue-400";

  return (
    <div className={`${bgClass} rounded-lg shadow-lg p-6 w-[min(90vw,820px)] max-h-[88vh]`}>
      {loader ? (
        <div className="flex items-center justify-center py-12">
          <Spinner />
        </div>
      ) : (
        <>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-full md:w-[200px]">
              {poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                  alt={`${title} poster`}
                  className="w-full h-auto rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-48 rounded-lg bg-gray-700 flex items-center justify-center">
                  <span className="text-sm text-gray-300">No Image</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className={`text-2xl md:text-3xl font-bold ${accentClass} mb-2`}>{title}</h2>

              <p className={`font-semibold ${subTextClass} mb-1`}>
                Release Date: <span className="text-white font-normal ml-1">{release_date ?? "N/A"}</span>
              </p>

              <p className={`font-semibold ${subTextClass} mb-3`}>
                Average Vote:{" "}
                <span className="text-white font-normal ml-1">
                  {vote_average != null ? vote_average.toFixed(1) : "N/A"}
                </span>
              </p>

              <p className={`text-sm leading-relaxed ${dark ? "text-gray-200" : "text-gray-800"}`}>
                {overview ?? "No Overview Available"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className={`text-xl font-semibold mb-3 ${accentClass}`}>Trailer</h3>

            <div className="w-full">
              <div style={{ position: "relative", paddingTop: "56.25%"  }} className="rounded-lg overflow-hidden bg-black/60">
                {trailerUrl ? (
                  <iframe
                    src={trailerUrl}
                    title={`${title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className={`${subTextClass} text-center`}>Trailer Not Available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!floatingClose && (
            <div className="mt-5">
              <button
                onClick={handleCloseModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieInfo;