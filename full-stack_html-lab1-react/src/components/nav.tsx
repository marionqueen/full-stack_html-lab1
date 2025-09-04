// src/components/Nav.tsx
import React from 'react';

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo-section">
          <img src="/Pixell.png" alt="Pixell River Financial Logo" className="logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#employees">Employees</a></li>
          <li><a href="#organization">Organization</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;