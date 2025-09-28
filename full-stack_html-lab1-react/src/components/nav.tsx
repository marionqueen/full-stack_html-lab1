// src/components/Nav.tsx
import React from 'react';
import { Link } from 'react-router';

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo-section">
          <img src="/Pixell.png" alt="Pixell River Financial Logo" className="logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="/employees">Employees</Link></li>
          <li><Link to="/organization">Organization</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;