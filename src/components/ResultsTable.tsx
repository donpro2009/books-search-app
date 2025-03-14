import { Book } from "@/app/types/books";
import { Table, Typography } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedBook } from "../app/redux/slices/bookSlice";
import { AppDispatch } from "../app/redux/store";

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

const { Title } = Typography;

// Functional Component that takes ResultTableProps as its props
// results is extracted from props
const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleRowClick = (record: Book) => {
    const bookId = record.key?.replace("/works", "") || record.id;
    dispatch(setSelectedBook(record));
    router.push(`/books/${bookId}`);
  };

  return (
    <>
      <Title level={3}>Found {results.length} books</Title>
      <Table
        style={{ borderRadius: "10px" }}
        columns={columns}
        dataSource={results}
        rowKey={
          (record) => record.key || `${record.id}-${record.title}` // Set the record to a string by concatenating title and publish year
        }
        pagination={{ pageSize: 10 }} //TODO: Allow changing pageSize
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </>
  );
};

export default ResultsTable;
