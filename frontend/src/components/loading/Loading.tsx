import React from 'react';
import loadingSvg from 'src/images/loading.svg';

const Loading = ({ message }: { message: string }): React.ReactElement => {
  return (
    <div>
      <img src={loadingSvg} alt="loading" />
      <p>{message}</p>
    </div>
  );
};

export default Loading;
