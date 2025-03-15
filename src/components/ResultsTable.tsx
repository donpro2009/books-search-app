import { Book } from "@/app/types/books";
import { Table, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedBook } from "../app/redux/slices/bookSlice";
import { AppDispatch } from "../app/redux/store";

interface ResultsTableProps {
  results: Book[];
}

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
    render: (authors?: string[]) => (authors ? authors?.join(", ") : "Unknown"),
  },
  {
    title: "First Publish Year",
    dataIndex: "first_publish_year",
    key: "first_publish_year",
  },
];

const { Title } = Typography;

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const numberOfResults: number = results.length;

  const [pageSize, setPageSize] = useState<number>(10);

  const handleRowClick = (record: Book) => {
    const bookId = record.key?.replace("/works", "") || record.id;
    dispatch(setSelectedBook(record));
    router.push(`/books/${bookId}`);
  };

  return (
    <>
      <Title level={3}>
        {numberOfResults === 0
          ? "No books found"
          : `Found ${numberOfResults} books`}
      </Title>

      <Table
        style={{ borderRadius: "10px" }}
        columns={columns}
        dataSource={results}
        rowKey={(record) => record.key || `${record.id}-${record.title}`}
        pagination={{
          pageSize: pageSize,
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </>
  );
};

export default ResultsTable;
