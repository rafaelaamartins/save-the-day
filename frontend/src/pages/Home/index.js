import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Logo from '../../component/Logo';
import api from '../../services/api';

import './styles.css';

function Home() {
  const [incidents, setIncidents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const ngoId = localStorage.getItem('ngoId');

  React.useEffect(() => {
    function loadIncidents() {
      setLoading(true)
      api.get("/incidents").then(response => {
        setIncidents(response.data);
      }).finally(() => {
        setLoading(false)
      })
    }
    loadIncidents();
  }, []);

  return (
    <main className="home-container">
      <div className="navbar">
        <Logo />

        <div className="login">

          {!ngoId ? (
            <Link className="button" to={`/login`}>
              Login
            </Link>
          ) : (
            <Link className="button" to={`/profile`}>
              My Profile
            </Link>
          )}
        </div>
      </div>


      <header>
        <h1>Welcome!</h1>
        <p>Choose one of the cases below and save the day</p>
      </header>

      <section className="home-incidents">

        {loading ? (
          <h1>Loading ...</h1>
        ) : incidents.length ? (
          <div className="incidents-list">
            <ul >
              {incidents.map(incident => (
                <li key={incident._id}>
                  <strong>Non-Governmental Organization:</strong>
                  <p>{incident?.ngo?.name}</p>
                  
                  <strong>City:</strong>
                  <p>{incident?.ngo?.city}</p>

                  <strong>Case:</strong>
                  <p>{incident.title}</p>

                  <strong>Description:</strong>
                  <p>{incident.description}</p>

                  <strong>Value:</strong>
                  <p>{Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(Number(incident.value))}</p>

                  <strong>
                    <Link className="more-details" to={`/incidents/${incident._id}`}>
                      See more details <FiArrowRight />
                    </Link>
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No registered cases</p>
        )}

      </section>
    </main>
  );
}

export default Home;