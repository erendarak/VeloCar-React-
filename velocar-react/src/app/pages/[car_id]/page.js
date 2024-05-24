'use client'
import Layout from '../../components/Layout';
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function CarPage({ params }) {
  const [car, setCar] = useState({});

  const loadCar = (id) => {
    fetch(`http://localhost:3001/cars/` + id)
      .then(response => response.json())
      .then(data => {
        setCar(data);
      })
      .catch(error => { console.log(error) });
  }

  useEffect(() => {
    loadCar(params.car_id);
  }, [params.car_id]);

  return (
    <Layout>
      <h1>{car.title}</h1>
      <div className="grid-container">
        <div className="grid-image">
          <div id="imageContainer">
            <img src={car.imageUrl} alt={car.title} />
          </div>
        </div>
        <div className="grid-info">
          <h2 id="title">{car.title}</h2>
          <div id="allignSide">
            <div id="normalText">Year:</div>
            <p id="year">{car.year}</p>
          </div>
          <div id="allignSide">
            <div id="normalText">KM:</div>
            <p id="km">{car.km}</p>
          </div>
          <div id="allignSide">
            <div id="normalText">HP:</div>
            <p id="hp">{car.hp}</p>
          </div>
          <div id="allignSide">
            <div id="normalText">Color:</div>
            <p id="color">{car.color}</p>
          </div>
          <div id="allignSide">
            <div id="normalText">Gear:</div>
            <p id="gear">{car.gear}</p>
          </div>
          <div id="allignSide">
            <div id="normalText">Fuel Type:</div>
            <p id="fuelType">{car.fuelType}</p>
          </div>
          <div id="allignSide">
            <div id="normalText">Price:</div>
            <p id="price">{car.price}</p>
          </div>
          <button className="buy-button">
          <Link href="/pages/payment">Buy Now</Link>
          </button>
        </div>
      </div>
    </Layout>
  );
}
