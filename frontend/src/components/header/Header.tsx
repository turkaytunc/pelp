import React from 'react';
import './header.scss';
const Header = () => {
  const textColor = 'hsl(200, 20%, 20%)';

  return (
    <div className="header" style={{ ['--color-inject' as any]: `${textColor}` }}>
      Header
    </div>
  );
};

export default Header;
