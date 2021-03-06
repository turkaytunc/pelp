import './header.scss';
import React from 'react';

const Header = () => {
  const textColor = 'hsl(200, 20%, 20%)';

  return (
    <div className="header" style={{ ['--color-inject' as any]: `${textColor}` }}>
      Rate Restaurant
    </div>
  );
};

export default Header;
