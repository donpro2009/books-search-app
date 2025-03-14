import { Flex, Spin } from "antd";
import React from "react";

const Loader = () => {
  return (
    <Flex justify="center" align="center" style={{ minHeight: "80vh" }}>
      <Spin size="large" />
    </Flex>
  );
};

export default Loader;
