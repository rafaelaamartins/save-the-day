import React, { useState } from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../../services/api';

import './styles.css';

import Logo from '../../../component/Logo';

export default function EditIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();
  const { id } = useParams();


  const ngoId = localStorage.getItem('ngoId');

  React.useEffect(() => {
    function getIncident() {
      api.get(`/incidents/${id}`).then(response => {
        setTitle(response.data.title)
        setDescription(response.data.description)
        setValue(response.data.value)
      })
    }
    getIncident();
  }, [id]);

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.put(`incidents/${id}`, data, {
        headers: {
          Authorization: ngoId,
        }
      })

      history.replace('/profile');
    } catch (err) {
      alert('Error when registering case, try again.');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
        <Logo />

          <h1>Edit case</h1>
          <p>Describe the case in detail to find a hero to solve this.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Back
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Case title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input 
            placeholder="Value"
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}