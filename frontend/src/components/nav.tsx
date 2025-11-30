import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src="/Pixell.png" alt="Pixell River Financial" />
      </div>
      <div className="nav-links">
        <Link to="/employees">Employees</Link>
        <Link to="/organization">Organization</Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}

export default Nav;