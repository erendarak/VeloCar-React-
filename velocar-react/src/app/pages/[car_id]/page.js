// pages/[car_id]/page.js

'use client'
import Layout from '../../components/Layout';
import { useState, useEffect } from "react";

export default function CarPage({ params }) {
  const [car, setCar] = useState({});

  const loadCar = (id) => {
    console.log(`Fetching car with ID: ${id}`); // Debug log
    fetch(`http://localhost:3001/cars/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched car data:', data); // Debug log
        setCar(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }

  useEffect(() => {
    const carId = params.car_id || params.carId;
    if (carId) {
      loadCar(carId);
    } else {
      console.error('Car ID is not provided in params');
    }
  }, [params.car_id, params.carId]);

  return (
    <Layout>
      <h1>{car.title || 'Loading...'}</h1>
      <div>
        <div className="grid-container">
          <div className="grid-image">
            <div id="imageContainer">
              {car.imageUrl ? (
                <img src={car.imageUrl} alt={car.title} />
              ) : (
                <p>Loading image...</p>
              )}
            </div>
          </div>
          <div className="grid-info">
            <h2 id="title">{car.title}</h2>
            <div id="allignSide">
              <div id="normalText">Year: </div>
              <p id="year">{car.year}</p>
            </div>
            <div id="allignSide">
              <div id="normalText">KM: </div>
              <p id="km">{car.km}</p>
            </div>
            <div id="allignSide">
              <div id="normalText">HP: </div>
              <p id="hp">{car.hp}</p>
            </div>
            <div id="allignSide">
              <div id="normalText">Color: </div>
              <p id="color">{car.color}</p>
            </div>
            <div id="allignSide">
              <div id="normalText">Gear: </div>
              <p id="gear">{car.gear}</p>
            </div>
            <div id="allignSide">
              <div id="normalText">Fuel Type: </div>
              <p id="fuelType">{car.fuelType}</p>
            </div>
            <div id="allignSide">
              <div id="normalText">Price: </div>
              <p id="price">{car.price}</p>
            </div>
            <button className="buy-button">
              <a href="PaymentScreen.html">Buy Now</a>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
