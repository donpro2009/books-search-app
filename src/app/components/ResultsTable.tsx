import React from "react";
import { Table } from "antd";

// Book Interface
interface Book {
  key?: string;
  id?: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
}

interface ResultsTableProps {
  results: Book[];
}

// Columns to display in table
const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Author",
    dataIndex: "author_name",
    key: "author_name",
    render: (authors?: string[]) => (authors ? authors?.join(", ") : "Unknown"), // Create a comma-separated string from all the authors
  },
  {
    title: "First Publish Year",
    dataIndex: "first_publish_year",
    key: "first_publish_year",
  },
];

// Functional Component that takes ResultTableProps as its props
// results is extracted from props
const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <Table
      columns={columns}
      dataSource={results}
      rowKey={
        (record) => record.key || `${record.title}-${record.first_publish_year}` // Set the record to a string by concatenating title and publish year
      }
      pagination={{ pageSize: 10 }} //TODO: Allow changing pageSize
    />
  );
};

export default ResultsTable;
