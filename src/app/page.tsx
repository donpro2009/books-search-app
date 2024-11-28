"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setBooks, setLoading } from "./redux/slices/bookSlice";
import SearchBar from "./components/SearchBar";
import ResultsTable from "./components/ResultsTable";
import axios from "axios";
import { Layout, Spin, Typography } from "antd";

// Destructure Layout and Typography components
const { Header, Content } = Layout;
const { Title } = Typography;

const Home: React.FC = () => {
  // State Manangement
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);

  // Call OpenLibrary API and save its data in results
  const handleSearch = async (query: string) => {
    dispatch(setLoading(true)); // Set the loading state to true while searching
    try {
      const response = await axios.get(
        `http://openlibrary.org/search.json?q=${query}`
      );
      dispatch(setBooks(response.data.docs));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false)); // Set the loading state to false when the search finishes
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
