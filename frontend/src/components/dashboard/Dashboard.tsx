import React from 'react';

const Dashboard = ({ name, email }: { name: string; email: string }): React.ReactElement => {
  return <div>Welcome {name}</div>;
};

export default Dashboard;
