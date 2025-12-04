import { configureStore } from "@reduxjs/toolkit";
import MovieSlice from "./MovieSlice";
import PaginationSlice from "./PaginationSlice";

const store = configureStore({
  reducer: {
    movie: MovieSlice,
    pagination: PaginationSlice,
  },
});

export default store;