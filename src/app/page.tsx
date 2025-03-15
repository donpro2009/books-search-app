"use client";

import { AppDispatch, RootState } from "@/app/redux/store";
import Loader from "@/components/Loader";
import MainHeader from "@/components/shared/MainHeader";
import { Layout } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultsTable from "../components/ResultsTable";
import SearchBar from "../components/SearchBar";
import { getBooks } from "./redux/slices/bookSlice";

const { Content } = Layout;

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      dispatch(getBooks(query));
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        gap: "10px",
      }}
    >
      <MainHeader />
      <Content>
        <SearchBar onSearch={handleSearch} />
        <br />
        {loading ? <Loader /> : <ResultsTable results={books} />}
      </Content>
    </Layout>
  );
};

export default Home;
