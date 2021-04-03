import React from 'react';
import './display-error.scss';

const DisplayError = ({ message, messageColor }: { message: string; messageColor?: string }): React.ReactElement => {
  return (
    <div className="display-error-container" style={{ backgroundColor: `${messageColor}` }}>
      {message}
    </div>
  );
};

DisplayError.defaultProps = { messageColor: '#444' };
export default DisplayError;
