import React, { useState, useEffect } from "react";

export const MovieContext = React.createContext();

const MovieContextWrapper = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    setWatchList(() => {
      if (localStorage.getItem("ImdbWatchListMovies")) {
        return JSON.parse(localStorage.getItem("ImdbWatchListMovies"));
      }
      return [];
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("ImdbWatchListMovies", JSON.stringify(watchList));
  }, [watchList]);

  const addToWatchList = (movie) => {
    setWatchList((prevState) => {
      const updatedWatchList = prevState ? [...prevState, movie] : [movie];
      return updatedWatchList;
    });
  };

  const removeFromWatchList = (movie) => {
    setWatchList((prevState) => {
      const filteredWatchList = prevState.filter((m) => {
        return m?.id != movie?.id;
      });
      return filteredWatchList;
    });
  };

  return (
    <MovieContext.Provider
      value={{ watchList, setWatchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextWrapper;