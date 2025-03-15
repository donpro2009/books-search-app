import { Book } from '@/app/types/books';
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export interface Book {
//   key?: string;
//   id?: string;
//   title: string;
//   author_name?: string[];
//   first_publish_year?: number;
//   description?:
//   | string
//   | {
//     type: string;
//     value: string;
//   };
//   cover_i?: number;
// }

interface BookState {
  books: Book[];
  loading: boolean;
  selectedBook: Book | null;
  coverImageUrl: string | undefined;
}

const initialState: BookState = {
  books: [],
  loading: false,
  selectedBook: null,
  coverImageUrl: undefined,
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (q: string) => {
    setLoading(true);
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${q}`
    );
    setLoading(false);
    return response.data.docs;
  }
);

export const getBookDetails = createAsyncThunk(
  "books/getBookDetails",
  async (id: string) => {
    const response = await axios.get(
      `https://openlibrary.org/works/${id}.json`
    );
    return response.data;
  }
);

export const getBookCover = createAsyncThunk(
  "books/getBookCover",
  async (coverId: number) => {
    const response = await axios.get(
      `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
      {
        responseType: "arraybuffer",
      }
    );
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    return `data:image/jpeg;base64,${base64}`;
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
    setCoverImageUrl(state, action: PayloadAction<string | undefined>) {
      state.coverImageUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getBooks.fulfilled,
        (state, action: PayloadAction<Book[]>) => {
          state.loading = false;
          state.books = action.payload;
        }
      )
      .addCase(getBooks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBookDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getBookDetails.fulfilled,
        (state, action: PayloadAction<Book>) => {
          state.loading = false;
          state.selectedBook = action.payload;
        }
      )
      .addCase(getBookDetails.rejected, (state) => {
        state.loading = false;
        state.selectedBook = null;
      })
      .addCase(getBookCover.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookCover.fulfilled, (state, action) => {
        state.coverImageUrl = action.payload;
      })
      .addCase(getBookCover.rejected, (state) => {
        state.loading = false;
        state.coverImageUrl = undefined;
      });
  },
});

export const { setBooks, setLoading, setSelectedBook, setCoverImageUrl } =
  bookSlice.actions;
export default bookSlice.reducer;
