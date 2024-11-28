"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { searchBooks } from "./redux/slices/bookSlice";
import SearchBar from "./components/SearchBar";
import ResultsTable from "./components/ResultsTable";
import { Layout, Spin, Typography } from "antd";

// Destructure Layout and Typography components
const { Header, Content } = Layout;
const { Title } = Typography;

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // State Manangement
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);

  // Call OpenLibrary API
  const handleSearch = async (query: string) => {
    if (query.trim()) {
      dispatch(searchBooks(query));
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Header
        style={{
          backgroundColor: "#fff",
          padding: "0 20px",
          marginBottom: "20px",
        }}
      >
        <Title level={2}>OpenLibrary Book Search Application</Title>
      </Header>
      <Content>
        <SearchBar onSearch={handleSearch} />
        {/* Display a spinner while loading = true */}
        {loading ? <Spin size="large" /> : <ResultsTable results={books} />}
      </Content>
    </Layout>
  );
};

export default Home;
