"use client";

import React, { useState } from "react";
import { Input, Button } from "antd"; // Import Input and Button components from Ant Design lib

// Props that the SearchBar will receive
interface SearchBarProps {
  onSearch: (query: string) => void; // Takes string as input and returns void
}

// Functional Component that takes SearchBarProps as its props
// onSearch is extracted from props
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // State Management
  const [query, setQuery] = useState("");

  // handleSearch will be called when the SearchButton is clicked
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <Input
        placeholder="Search for books"
        size="large"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="primary" size="large" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
