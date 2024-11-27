"use client";

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultsTable from "./components/ResultsTable";
import axios from "axios";
import { Layout, Typography } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

interface Book {
  key?: string;
  id?: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
}

const Home: React.FC = () => {
  const [results, setResults] = useState<Book[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(
        `http://openlibrary.org/search.json?q=${query}`
      );
      setResults(response.data.docs);
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
        <ResultsTable results={results} />
      </Content>
    </Layout>
  );
};

export default Home;
