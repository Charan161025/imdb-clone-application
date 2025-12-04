import React, { useContext, useState, useEffect } from "react";
import genreids from "../../helpers/GenreIds";
import { ArrowUp, ArrowDown, Trash2, Search } from "lucide-react";
import { MovieContext } from "../../context/MovieContextWrapper";

const WatchListTable = () => {
  const [search, setSearch] = useState("");
  const [currGenre, setCurrGenre] = useState("All Genre");
  const [genreList, setGenreList] = useState(["All Genre"]);

  const { watchList = [], setWatchList, removeFromWatchList } =
    useContext(MovieContext);

  useEffect(() => {
    const allGenres = Array.isArray(genreids)
      ? genreids
      : Object.values(genreids || {});
    const unique = Array.from(new Set(allGenres.filter(Boolean)));
    setGenreList(["All Genre", ...unique]);
  }, []);

  const handleAscendingOrderRatings = () => {
    const sorted = [...watchList].sort((a, b) => (a?.vote_average || 0) - (b?.vote_average || 0));
    setWatchList(sorted);
  };

  const handleDescendingOrderRatings = () => {
    const sorted = [...watchList].sort((a, b) => (b?.vote_average || 0) - (a?.vote_average || 0));
    setWatchList(sorted);
  };

  const filtered = watchList
    .filter((movie) => {
      if (!movie) return false;
      return (
        currGenre === "All Genre" ||
        genreids[movie?.genre_ids?.[0]] === currGenre
      );
    })
    .filter((movie) =>
      movie?.title?.toLowerCase().trim().includes(search.toLowerCase())
    );

  return (
    <div className="my-10 mx-4 md:mx-8 text-gray-200">

      
      <div className="mb-6 rounded-2xl bg-[#141414] p-6 shadow-lg border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              My Watchlist
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Browse and manage movies you've saved — sort, search, or remove.
            </p>
          </div>

          <div className="flex items-center bg-[#1f1f1f] rounded-full p-2 pr-3 shadow-inner border border-white/10">
            <div className="flex items-center gap-2 rounded-full px-3 py-1">
              <Search size={16} className="text-gray-300" />
              <input
                className="bg-transparent outline-none placeholder-gray-400 text-white text-sm w-44 md:w-64"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 justify-center md:justify-start">
        {genreList.map((genre, idx) => (
          <button
            key={idx}
            onClick={() => setCurrGenre(genre)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all
              ${
                currGenre === genre
                  ? "bg-blue-600 text-white scale-105 shadow-lg"
                  : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333333]"
              }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl bg-[#1a1a1a] p-1 shadow-lg border border-white/10">
        <table className="min-w-full divide-y divide-gray-700 bg-[#111111] rounded-lg text-gray-200">
          <thead className="bg-[#1f1f1f] text-gray-300">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Movie</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleAscendingOrderRatings}
                      className="p-1 rounded hover:bg-[#333333]"
                      title="Sort ascending"
                    >
                      <ArrowUp size={18} />
                    </button>
                    <button
                      onClick={handleDescendingOrderRatings}
                      className="p-1 rounded hover:bg-[#333333]"
                      title="Sort descending"
                    >
                      <ArrowDown size={18} />
                    </button>
                  </div>
                  <span>Rating</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Popularity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Genre</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No movies found — try another search or select a different genre.
                </td>
              </tr>
            ) : (
              filtered.map((movie, idx) => (
                <tr
                  key={movie?.id ?? idx}
                  className="hover:bg-[#222222] transition-colors"
                >
                  <td className="flex items-center gap-4 px-6 py-4">
                    <div className="relative h-20 w-32 rounded-lg overflow-hidden shadow-md">
                      <img
                        src={
                          movie?.backdrop_path
                            ? `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`
                            : `https://via.placeholder.com/320x180?text=No+Image`
                        }
                        alt={movie?.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="text-white font-semibold">{movie?.title}</div>
                      <div className="text-sm text-gray-400 mt-1 max-w-xs">
                        {movie?.overview
                          ? `${movie.overview.slice(0, 110)}${
                              movie.overview.length > 110 ? "…" : ""
                            }`
                          : "No description"}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2">
                      <div className="font-medium text-gray-200">
                        {movie?.vote_average ?? "—"}
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-[#333333] text-gray-200">
                        {movie?.vote_count ?? 0}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-gray-200 font-medium">
                      {Math.round(movie?.popularity ?? 0)}
                    </div>
                    <div className="text-xs text-gray-500">pop score</div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#222222] text-gray-200 border border-white/10 text-sm">
                      {genreids[movie?.genre_ids?.[0]] ?? "Unknown"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeFromWatchList(movie)}
                      className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-red-600 text-white shadow hover:scale-105 transition-transform"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right text-sm text-gray-400">
        Showing{" "}
        <span className="font-semibold text-white">{filtered.length}</span> of{" "}
        <span className="font-semibold text-white">{watchList.length}</span>{" "}
        movies
      </div>
    </div>
  );
};

export default WatchListTable;