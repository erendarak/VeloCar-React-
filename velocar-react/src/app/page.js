"use client";
import Layout from "./components/Layout";
import "./public/assets/styles/carView.css";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <>
      <Layout>
        <ProductList></ProductList>
      </Layout>
    </>
  );
}
