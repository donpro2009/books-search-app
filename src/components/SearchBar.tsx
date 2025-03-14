"use client";

import { Col, Input, Row } from "antd";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const { Search } = Input;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Row gutter={10}>
      <Col xs={24} sm={24} md={24}>
        <Search
          placeholder="Search for books..."
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Col>
    </Row>
  );
};

export default SearchBar;
