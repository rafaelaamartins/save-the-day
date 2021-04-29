import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import Logo from '../../component/Logo';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);
      history.replace('/profile');
    } catch (err) {
      const { error } = err.response.data;
      alert( error || 'Login failed, please try again.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
       <Logo />

        <form onSubmit={handleLogin}>
          <h1>Log in</h1>

          <input 
            placeholder="Your ID"
            value={id}
            onChange={e => setId(e.target.value)}
            required
          />

          <button className="button" type="submit">Enter</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            I have no registration
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
