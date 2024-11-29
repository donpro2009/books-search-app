"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchBookDetails, fetchBookCover } from "../../redux/slices/bookSlice";
import { Layout, Typography, Spin, Button, Card } from "antd";
import Image from "next/image";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const BookDetailsPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const selectedBook = useSelector(
    (state: RootState) => state.books.selectedBook
  );
  const loading = useSelector((state: RootState) => state.books.loading);
  const coverImageUrl = useSelector(
    (state: RootState) => state.books.coverImageUrl
  );

  // Get book details
  useEffect(() => {
    if (id && typeof id === "string") {
      dispatch(fetchBookDetails(id));
    }
  }, [id, dispatch]);

  // Get book cover
  useEffect(() => {
    if (selectedBook && selectedBook.cover_i && !coverImageUrl) {
      dispatch(fetchBookCover(selectedBook.cover_i));
    }
  }, [selectedBook, coverImageUrl, dispatch]);

  const handleBackClick = () => {
    router.back();
  };

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
          <Button onClick={handleBackClick} type="primary">
            Back
          </Button>
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
          <Button onClick={handleBackClick} type="primary">
            Back
          </Button>
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
          padding: "20px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center", // Ensure alignment is correct
          gap: "10px",
        }}
      >
        <Button onClick={handleBackClick} type="primary">
          Back
        </Button>
        <Title level={2}>{selectedBook.title}</Title>
      </Header>
      <Content>
        <Card
          style={{ margin: "0 auto", maxWidth: "800px" }} // Center the card and set max width
          cover={
            coverImageUrl && (
              <Image
                src={coverImageUrl}
                alt={`${selectedBook.title}`}
                width={800} // Set a width for the image
                height={400} // Set a height for the image
                style={{ objectFit: "contain" }}
              />
            )
          }
        >
          <Title level={4}>Author</Title>
          <Text>
            {selectedBook.author_name
              ? selectedBook.author_name.join(", ")
              : "Unknown"}
          </Text>
          <Title level={4} style={{ marginTop: "16px" }}>
            Description
          </Title>
          <Text>
            {typeof selectedBook.description === "string"
              ? selectedBook.description
              : selectedBook.description?.value || "No description available"}
          </Text>
        </Card>
      </Content>
    </Layout>
  );
};

export default BookDetailsPage;
