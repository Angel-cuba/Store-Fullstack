import React from 'react';
import '../styles/pages/NotUserFound.scss';

const NotUserFound = () => {
  React.useEffect(() => {
    document.title = 'Not User Found';
  }, []);
  return <div className="notUser">NotUserFound</div>;
};

export default NotUserFound;
