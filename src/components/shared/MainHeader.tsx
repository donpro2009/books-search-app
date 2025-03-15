import { Col, Layout, Row, Typography } from "antd";
import React from "react";

const { Header } = Layout;
const { Title } = Typography;

const MainHeader = () => {
    return (
      <Row>
        <Col xs={24} sm={24} md={24}>
          <Header
            style={{
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              verticalAlign: "middle",
              borderRadius: "10px",
            }}
          >
            <Title level={2}>OpenLibrary Book Search Application</Title>
          </Header>
        </Col>
      </Row>
    );
};

export default MainHeader;
