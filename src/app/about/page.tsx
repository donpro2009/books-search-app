"use client";

import { Layout, Typography, List } from "antd";

// Destructure Layout and Typography components
const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function About() {
  const techUsed = [
    "Next.js 15",
    "React 18",
    "React-dom 18",
    "Ant Design",
    "Redux",
  ];

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Header
        style={{
          backgroundColor: "#fff",
          padding: "0 20px",
          marginBottom: "20px",
        }}
      >
        <Title level={2}>About this Application</Title>
      </Header>
      <Content>
        <List
          header={<h2>Technologies Used</h2>}
          bordered
          dataSource={techUsed}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
        <Text>Created by Preveen Ramcharan</Text>
      </Content>
    </Layout>
  );
}
