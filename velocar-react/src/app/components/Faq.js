'use client'
import '../public/assets/styles/carView.css';
import Layout from '../components/Layout';
import React, { useState } from "react";

const containsNumbers = (str) => /\d/.test(str);

const validateIfInvalidName = (name) => {
  if (name.trim() === "" || containsNumbers(name)) {
    return false;
  }
  return true;
};

export default function Faq() {

    const [subscriber, setSubscriber] = useState({ name: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSubscriber({ ...subscriber, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);

        if (!validateIfInvalidName(subscriber.name)) {
            setError('Please enter a valid name without numbers.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/subscribers?email=' + subscriber.email);
            const data = await response.json();

            if (data.length > 0) {
                const existingSubscriber = data[0];
                await updateSubscriber(existingSubscriber.id, { ...existingSubscriber, name: subscriber.name });
                setSuccessMessage('Name updated successfully.');
            } else {
                const postResponse = await fetch('http://localhost:3001/subscribers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(subscriber)
                });
                if (postResponse.ok) {
                    setSuccessMessage('Subscriber saved successfully!');
                    setSubscriber({ name: '', email: '' });
                } else {
                    setError('An error occurred while saving the subscriber.');
                }
            }
            setIsSubmitting(false);
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error:', error);
            setIsSubmitting(false);
        }
    };

    const updateSubscriber = async (id, updatedData) => {
        const response = await fetch(`http://localhost:3001/subscribers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update subscriber');
        }

        return response.json();
    };

    return (
        <Layout>
            <main className="container">
                <h1 className="font">FAQ</h1>
                <div className="grid-container background-color">
                    <div className="grid-image">
                        <div className="image-container">
                            <h2 className="VeloCarLogo2 font">How it Works?</h2>
                            <p className="font3">
                                Buying with VeloCars is as easy as 1,2,3. Simply search for your car, pay online or use our finance or trade-in options, and then have the car delivered to one of our Customer Centers. We are the hassle-free, fast and secure way to buy yourself a used car, and we're by your side every step of the way.
                            </p>
                        </div>
                    </div>
                    <div className="grid-info">
                        <h2 className="VeloCarLogo2 font">Wanna learn more about our business?</h2>
                        <p className="font3">For contacting us, please:</p>
                        <form className="allign" onSubmit={handleSubmit}>
                            <label className="font2">Name</label>
                            <input
                                type="text"
                                className="largerInput"
                                id="name"
                                placeholder="Example Example"
                                value={subscriber.name}
                                onChange={handleInputChange}
                                required
                            />
                            <label className="font2">E-Mail</label>
                            <input
                                type="email"
                                className="largerInput"
                                id="email"
                                placeholder="example@gmail.com"
                                value={subscriber.email}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit" className="buy-button" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send'}
                            </button>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </div>
                </div>
            </main>
        </Layout>
    );
}