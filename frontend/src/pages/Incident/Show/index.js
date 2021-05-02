import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../../component/Navbar';
import api from '../../../services/api';
import { isEmpty } from 'lodash';

import './styles.css'

export default function ShowIncident() {
  const [incident, setIncident] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    function getIncident() {
      setLoading(true)
      api.get(`/incidents/${id}`).then(response => {
        setIncident(response.data);
      }).finally(() => {
        setLoading(false)
      })
    }
    getIncident();
  }, [id]);

  return (
    <main className="home-container">
      <Navbar />

        {loading ? (
          <div className="block">
            <h1 >Loading ...</h1>
          </div>
        ) : !isEmpty(incident) ? (
          <>
              <header>
                <h1>{incident.title}</h1>
                <p>ID case: {incident._id}</p>
              </header>
            <section className="home-incidents">
              <div className="incidents-list">
              <ul style={{ gridTemplateColumns : 'repeat(2, 1fr)' }}>
                  <li key={incident._id}>
                    <strong>Non-Governmental Organization:</strong>
                    <p>{incident.ngo?.name}</p>
                    
                    <strong>City:</strong>
                    <p>{incident.ngo?.city}</p>

                    <strong>Case:</strong>
                    <p>{incident.title}</p>

                    <strong>Description:</strong>
                    <p>{incident.description}</p>

                    <strong>Value:</strong>
                    <p>{Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(Number(incident.value))}</p>
                  </li>

                  <li key={incident._id}>
                    <h1><strong>Save the day! <br /> Be the hero of this case</strong></h1>
                    <p>Contact:</p>
                    
                    <div className="contact-row">
                      <a className="button" href={`tel:${incident?.ngo?.whatsapp}`}>Whatsapp</a>
                      <a className="button" href={`mailto:${incident?.ngo?.email}`}>Email</a>
                    </div>
                  </li>
              </ul>
            </div>
           </section>
          </>
        ) : (
          <div className="block">
            <h1>Not found case.</h1>
            <br/>
            <Link to="/" className="button" style={{ width: '25%'}}>Go Home</Link>
          </div>
        )}
    </main>
  );
}
