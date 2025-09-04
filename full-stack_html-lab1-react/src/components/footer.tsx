import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p>Copyright Pixell River Financial {currentYear}</p>
    </footer>
  );
};

export default Footer;