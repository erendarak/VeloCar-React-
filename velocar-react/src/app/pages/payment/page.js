'use client';
import React, { useState, useEffect } from 'react';
import '../../public/assets/styles/payment.css';
import Layout from '../../components/Layout';

const Payment = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    cvv: '',
    expDate: '',
    paymentMethod: 'Credit Card'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value
    });
  };

  const handleCardNumberInput = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, '').slice(0, 16);
    setPaymentInfo((prevState) => ({ ...prevState, cardNumber: sanitizedValue }));
  };

  const handleCvvInput = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, '').slice(0, 3);
    setPaymentInfo((prevState) => ({ ...prevState, cvv: sanitizedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
        resetForm();
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentInfo)
      });

      if (response.ok) {
        alert('Payment information stored successfully!');
        resetForm();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert('Payment Submission Failed');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Payment Submission Failed');
    }
  };

  const validate = () => {
    const { cardName, cardNumber, cvv, expDate } = paymentInfo;

    if (cardName === '' || cardNumber === '' || cvv === '' || expDate === '') {
      alert("Please fill in all fields.");
      return false;
    }

    const today = new Date();
    const expirationDate = new Date(expDate);

    if (expirationDate <= today) {
      alert("Expiration date has already passed.");
      return false;
    }

    if (cvv.length !== 3) {
      alert("CVV must be exactly 3 digits long.");
      return false;
    }

    if (cardNumber.length !== 16) {
      alert("Card Number must be exactly 16 characters long.");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setPaymentInfo({
      cardName: '',
      cardNumber: '',
      cvv: '',
      expDate: '',
      paymentMethod: 'Credit Card'
    });
  };

  return (
    <Layout>
      <div className="PaymentPage">
        <div className="PaymentMethodBar">
          <h1 className="choosePaymentText"><u>Choose Your Payment Method</u></h1>
          <div className="radioButtonCard">
            <input
              type="radio"
              id="CreditCard"
              name="paymentMethod"
              value="Credit Card"
              checked={paymentInfo.paymentMethod === 'Credit Card'}
              onChange={handleChange}
            />
            <label htmlFor="CreditCard">Credit Card</label>
          </div>

          <div className="radioButtonDebitCard">
            <input
              type="radio"
              id="Debit"
              name="paymentMethod"
              value="Debit Card"
              checked={paymentInfo.paymentMethod === 'Debit Card'}
              onChange={handleChange}
            />
            <label htmlFor="Debit">Debit Card</label>
          </div>
        </div>

        <div className="PaymentInfoBar">
          <form onSubmit={handleSubmit} id="PaymentForm">
            <div className="CardNameText">
              <p><b>Name On the Card</b></p>
              <input
                className="CNameInput"
                type="text"
                name="cardName"
                id="CNameInput"
                value={paymentInfo.cardName}
                onChange={handleChange}
              />
            </div>

            <div className="CardNum">
              <p><b>Card Number</b></p>
              <input
                className="CNumInput"
                type="text"
                name="cardNumber"
                id="CNumInput"
                value={paymentInfo.cardNumber}
                onChange={handleCardNumberInput}
              />
            </div>

            <div className="CVV">
              <p><b>CVV</b></p>
              <input
                className="CVVInput"
                type="text"
                name="cvv"
                id="CVVInput"
                value={paymentInfo.cvv}
                onChange={handleCvvInput}
              />
            </div>

            <div className="ExpDate">
              <p><b>Expiration Date</b></p>
              <input
                className="EXPDateInput"
                type="date"
                name="expDate"
                id="EXPDateInput"
                value={paymentInfo.expDate}
                onChange={handleChange}
              />
            </div>

            <button className="PaymentSubmitButton" type="submit" name="paymentSubmit" id="PaymentSubmitButton">Complete the Payment</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
