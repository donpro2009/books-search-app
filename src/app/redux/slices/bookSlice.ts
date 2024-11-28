import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  key?: string;
  id?: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
}

interface BookState {
  books: Book[];
  loading: boolean;
}

const initialState: BookState = {
  books: [],
  loading: false, // Initail loading state
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setBooks, setLoading } = bookSlice.actions;
export default bookSlice.reducer;
