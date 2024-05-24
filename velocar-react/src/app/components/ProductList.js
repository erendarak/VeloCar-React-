import React from "react";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "./ProductCard";

function ProductList() {
  const products = [
    {
      id: 1,
      name: "Product A",
      description: "Description of Product A.",
      price: 29.99,
      image: "https://picsum.photos/300/200", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Product B",
      description: "Description of Product B.",
      price: 45.5,
      image:
        "https://ucbbe1b6a16dda103e5583fcc7bb.dl.dropboxusercontent.com/cd/0/inline/CThuvZxf3XyAKi7W5LepspLI786dTPsmP8qXWfAkBlapUux1uJoBvkMKfJ9HDRKWkURT3fB88dizxXLVOE9t6QFBV3NgZpdZroUE07hQzyMsIq4WgjxzGw7QnbOunCfr-hDF63zmPGbB3D5yln31dH-8/file#",
    },
    // ... more product objects
  ];

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm="12" md="6" lg="5" xl="5">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
