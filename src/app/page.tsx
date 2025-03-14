"use client";

import { AppDispatch, RootState } from "@/app/redux/store";
import Loader from "@/components/Loader";
import { Layout, Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultsTable from "../components/ResultsTable";
import SearchBar from "../components/SearchBar";
import { searchBooks } from "./redux/slices/bookSlice";

const { Header, Content } = Layout;
const { Title } = Typography;

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      dispatch(searchBooks(query));
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
      <Header
        style={{
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          verticalAlign: "middle",
          borderRadius: "10px",
        }}
      >
        <Title level={2}>OpenLibrary Book Search Application</Title>
      </Header>
      <Content>
        <SearchBar onSearch={handleSearch} />
        <br />
        {loading ? <Loader /> : <ResultsTable results={books} />}
      </Content>
    </Layout>
  );
};

export default Home;
