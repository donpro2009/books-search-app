"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setBooks } from "./redux/slices/bookSlice";
import SearchBar from "./components/SearchBar";
import ResultsTable from "./components/ResultsTable";
import axios from "axios";
import { Layout, Typography } from "antd";

// Destructure Layout and Typography components
const { Header, Content } = Layout;
const { Title } = Typography;

const Home: React.FC = () => {
  // State Manangement
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);

  // Call OpenLibrary API and save its data in results
  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(
        `http://openlibrary.org/search.json?q=${query}`
      );
      dispatch(setBooks(response.data.docs));
    } catch (error) {
      console.error("Error fetching data:", error);
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
        <ResultsTable results={books} />
      </Content>
    </Layout>
  );
};

export default Home;
