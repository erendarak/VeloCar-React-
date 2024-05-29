"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "./ProductCard";
import "../public/assets/styles/carView.css";

function ProductList() {
  const [products, setCarList] = useState([]);
  const [carsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if (!carsLoaded) {
      loadProducts();
    }
  }, [carsLoaded]);

  const loadProducts = () => {
    fetch(`http://localhost:3001/cars`)
      .then((response) => response.json())
      .then((data) => {
        setCarList(data);
        setProductsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="Container">
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm="12" lg="6">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
