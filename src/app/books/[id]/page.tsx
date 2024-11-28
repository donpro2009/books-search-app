"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchBookDetails } from "../../redux/slices/bookSlice";
import { Layout, Typography, Spin } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const BookDetailsPage: React.FC = () => {
  // const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const selectedBook = useSelector(
    (state: RootState) => state.books.selectedBook
  );
  const loading = useSelector((state: RootState) => state.books.loading);

  useEffect(() => {
    if (id && typeof id === "string" && !loading && !selectedBook) {
      dispatch(fetchBookDetails(id));
    }
  }, [id, dispatch, loading, selectedBook]);

  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh", padding: "20px" }}>
        <Header
          style={{
            backgroundColor: "#fff",
            padding: "0 20px",
            marginBottom: "20px",
          }}
        >
          <Title level={2}>Loading...</Title>
        </Header>
        <Content>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (!selectedBook) {
    return (
      <Layout style={{ minHeight: "100vh", padding: "20px" }}>
        <Header
          style={{
            backgroundColor: "#fff",
            padding: "0 20px",
            marginBottom: "20px",
          }}
        >
          <Title level={2}>Book Not Found</Title>
        </Header>
        <Content>
          <Text>No details available for this book.</Text>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Header
        style={{
          backgroundColor: "#fff",
          padding: "0 20px",
          marginBottom: "20px",
        }}
      >
        <Title level={2}>{selectedBook.title}</Title>
      </Header>
      <Content>
        <Title level={4}>Author</Title>
        <Text>
          {selectedBook.author_name
            ? selectedBook.author_name.join(", ")
            : "Unknown"}
        </Text>
        <Title level={4}>Description</Title>
        <Text>
          {typeof selectedBook.description === "string"
            ? selectedBook.description
            : selectedBook.description?.value || "No description available"}
        </Text>

        {/*
        <Text>
          {Array.isArray(selectedBook.author_name)
            ? selectedBook.author_name.join(", ") // Only join if it's an array
            : "Unknown"}
        </Text> */}

        {/* <Title level={4}>First Publish Year</Title>
        <Text>{selectedBook.first_publish_year}</Text>
        {selectedBook.description && (
          <>
            <Title level={4}>Description</Title>
            <Paragraph>{selectedBook.description}</Paragraph>
          </>
        )} */}
      </Content>
    </Layout>
  );
};

export default BookDetailsPage;
