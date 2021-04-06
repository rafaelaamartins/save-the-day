import React from 'react';

import Logo from '../Logo';
import { Link } from 'react-router-dom';

function Navbar() {
  const ngoId = localStorage.getItem('ngoId');
  
  return (
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
  );
}

export default Navbar;