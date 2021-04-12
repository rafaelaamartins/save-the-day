import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/Incident/New';
import EditIncident from './pages/Incident/Edit';
import ShowIncident from './pages/Incident/Show';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Logon} />
        <Route path="/register" component={Register} />

        <Route path="/profile" component={Profile} />
        <Route path="/incidents/new" exact component={NewIncident} />
        <Route path="/incidents/:id" exact component={ShowIncident} />
        <Route path="/incidents/:id/edit" exact component={EditIncident} />
      </Switch>
    </BrowserRouter>
  );
}