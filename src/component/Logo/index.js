import React from 'react';
import { useHistory } from 'react-router';

import logoImg from '../../assets/logo.svg';

function Logo() {
  const history = useHistory();

  return <img style={{ cursor: 'pointer'}} src={logoImg} alt="Save the day" onClick={() => history.replace('/')}/>;
}

export default Logo;