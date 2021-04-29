import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import Logo from '../../component/Logo';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
    };

    try {
      const response = await api.post('ongs', data);

      alert(`Your access ID: ${response.data.id}`);

      history.replace('/');
    } catch (err) {
      alert('Registration error, please try again.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <Logo />

          <h1>Register</h1>
          <p>Make your registration, enter the platform and help people find the cases of your NGO.</p>

          <Link className="back-link" to="/login">
            <FiArrowLeft size={16} color="#E02041" />
            I already have registration
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Name of the NGO"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />


          <div className="input-group">
            <input 
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />

            <input 
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}