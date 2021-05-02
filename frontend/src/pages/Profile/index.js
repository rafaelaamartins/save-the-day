import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import Logo from '../../component/Logo';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ngoId = localStorage.getItem('ngoId');
  const ngoName = localStorage.getItem('ngoName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ngoId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ngoId]);

  async function handleDeleteIncident(id) {
    try {
        if(window.confirm("Are you sure?")) {
            await api.delete(`incidents/${id}`, {
              headers: {
                Authorization: ngoId,
              }
            }).then(() => {
              setIncidents(incidents.filter(incident => incident._id !== id));
            });
        }

    } catch (err) {
      alert('Error deleting case, try again.');
    }
  }

  async function handleEditIncident(id) {
    history.push(`incidents/${id}/edit`)
  }

  function handleLogout() {
    localStorage.clear();
    history.replace('/');
  }

  return (
    <div className="profile-container">
      <header>
        <Logo />
        <span>Welcome, {ngoName}</span>

        <Link className="button" to="/incidents/new">Register new case</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Registered cases</h1>

      <div className="incidents-list">
          <ul >
            {incidents.length ? incidents.map(incident => (
              <li key={incident._id}>
                <strong>CASE:</strong>
                <p>{incident.title}</p>

                <strong>DESCRIPTION:</strong>
                <p>{incident.description}</p>

                <strong>VALUE:</strong>
                <p>{Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(Number(incident.value))}</p>

                <button className="edit" onClick={() => handleEditIncident(incident._id)} type="button">
                  <FiEdit2 size={20} color="#a8a8b3" />
                </button>

                <button className="delete" onClick={() => handleDeleteIncident(incident._id)} type="button">
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </li>
            )) : (
              <p>No registered cases</p>
            )}
          </ul>
      </div>
    </div>
  );
}