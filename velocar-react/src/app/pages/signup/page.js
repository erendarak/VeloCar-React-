'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../public/assets/styles/signUp.css';
import Layout from '../../components/Layout';

const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    rePassword: ''
  });

  const [storedData, setStoredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        setStoredData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    if (!validateIfEmpty()) {
      return false;
    }
    if (!validatePasswordLength()) {
      return false;
    }
    if (!validatePasswordMatch()) {
      return false;
    }
    if (!validateIfInvalidName()) {
      return false;
    }
    if (!validateEmail(formData.email)) {
      return false;
    }
    return true;
  };

  const containsNumbers = (value) => {
    return /\d/.test(value);
  };

  const validateIfEmpty = () => {
    if (
      formData.name === '' ||
      formData.surname === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.rePassword === ''
    ) {
      alert('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const validateIfInvalidName = () => {
    if (
      (formData.name.trim() === '' || containsNumbers(formData.name)) ||
      (formData.surname.trim() === '' || containsNumbers(formData.surname))
    ) {
      alert('Please enter a valid name and surname without numbers.');
      return false;
    }
    return true;
  };

  const validatePasswordLength = () => {
    if (formData.password.length <= 5 || formData.password.length > 16) {
      alert('Password must be between 6 and 16 characters long.');
      return false;
    }
    return true;
  };

  const validatePasswordMatch = () => {
    if (formData.password !== formData.rePassword) {
      alert('Passwords do not match.');
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const existingEmail = storedData.find((item) => item.email === email);

    if (existingEmail) {
      alert('This email already exists. Please use a different email.');
      return false;
    } else {
      return true;
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      surname: '',
      email: '',
      password: '',
      rePassword: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      resetForm();
      return;
    }

    setIsLoading(true);

    const newUser = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        alert('Successfully signed up!');
        const updatedStoredData = [...storedData, newUser];
        setStoredData(updatedStoredData);
        localStorage.setItem('storedData', JSON.stringify(updatedStoredData));
        resetForm();
        router.push('/pages/Login'); 
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert('Sign Up Failed');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Sign Up Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="SignUpBar" name="SUPBar">
        <form id="signupForm" onSubmit={handleSubmit}>
          <h1 className="SignUpText">Sign Up</h1>

          <div className="NameText" id="NameText">
            <p><b>Name:</b></p>
          </div>
          <input
            className="NameInput"
            type="text"
            name="name"
            id="NameInput"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="SurnameText">
            <p><b>Surname:</b></p>
          </div>
          <input
            className="SurnameInput"
            type="text"
            name="surname"
            id="SurnameInput"
            value={formData.surname}
            onChange={handleChange}
            required
          />

          <div className="emailText">
            <p><b>Email:</b></p>
          </div>
          <input
            className="MailInput"
            type="email"
            name="email"
            id="MailInput"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="PasswordText">
            <p><b>Password:</b></p>
          </div>
          <input
            className="PasswordInput"
            type="password"
            name="password"
            id="PasswordInput"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="rePasswordText">
            <p><b>Re-Enter Password:</b></p>
          </div>
          <input
            className="rePasswordInput"
            type="password"
            name="rePassword"
            id="rePasswordInput"
            value={formData.rePassword}
            onChange={handleChange}
            required
          />

          <button className="SignUpButton2" type="submit" id="SignUpButton2" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
