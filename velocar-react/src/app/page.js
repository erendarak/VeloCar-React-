'use client'
import { useState, useEffect } from "react";
import Layout from './components/Layout';
import Catalog from "./components/Catalog";
import Link from 'next/link';
import './public/assets/styles/carView.css';
import {ApplicationContext} from "./components/ApplicationContext"
import ProductCount from "./components/ProductCount";

export default function Home() {
  const [carList, setCarList] = useState([]);
  const [carsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => { 
    if (!carsLoaded) {
      loadProducts();
    }
  }, [carsLoaded]);
  const title = "My Products are here";

  const loadProducts = () => {
    fetch(`http://localhost:3001/cars`)
      .then(response => response.json())
      .then(data => {
        setCarList(data);
        setProductsLoaded(true);
      })
      .catch(error => { console.log(error) })
  }

  return (
    <main>
      <Layout>
        <h1>Available Cars</h1>
        <ApplicationContext.Provider value={{ data: "Data from context!" }}>
        <ProductCount productCount={carList.length} />
        <Catalog tableHeader={title} carList={carList}></Catalog>
      </ApplicationContext.Provider>
      </Layout>
    </main>
  );
}