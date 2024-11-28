import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Book {
  key?: string;
  id?: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  description?:
    | string
    | {
        type: string;
        value: string;
      };
}

interface BookState {
  books: Book[];
  loading: boolean;
  selectedBook: Book | null;
}

const initialState: BookState = {
  books: [],
  loading: false, // Initail loading state
  selectedBook: null, // No book selected initially
};

// Async thunk for searching for books
export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (q: string) => {
    const response = await axios.get(
      `http://openlibrary.org/search.json?q=${q}`
    );
    return response.data.docs;
  }
);

// Async thunk for fetching book details
export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async (id: string) => {
    const response = await axios.get(`http://openlibrary.org/works/${id}.json`);

    return response.data;
  }
);

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
    setSelectedBook(state, action: PayloadAction<Book | null>) {
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        searchBooks.fulfilled,
        (state, action: PayloadAction<Book[]>) => {
          state.loading = false;
          state.books = action.payload;
        }
      )
      .addCase(searchBooks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchBookDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchBookDetails.fulfilled,
        (state, action: PayloadAction<Book>) => {
          state.loading = false;
          state.selectedBook = action.payload;
        }
      )
      .addCase(fetchBookDetails.rejected, (state) => {
        state.loading = false;
        state.selectedBook = null;
      });
  },
});

export const { setBooks, setLoading, setSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
