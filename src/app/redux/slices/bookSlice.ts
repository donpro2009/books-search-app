import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";

interface Book {
  key?: string;
  id?: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
}

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
  },
});

export const {setBooks} = bookSlice.actions;
export default bookSlice.reducer;