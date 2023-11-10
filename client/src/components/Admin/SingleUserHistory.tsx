import React from 'react';
import UserDetails from './UserDetails';

const SingleUserHistory = ({ history, setOpenHistory }: any) => {
  const handleClose = () => {
    setOpenHistory(false);
  };

  return (
    <div className="singleHistory-info">
      <button onClick={handleClose} className="btn-close">
        Close
      </button>
      {history &&
        history.map((single: any) => {
          return (
            <div className="single">
              {single.createdAt.split('T')[0]} <span>Purchases: {single.products.length}</span>
              {single.products.map((product: any, index: number) => (
                <div className="" key={index}>
                  <UserDetails product={product} />
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default SingleUserHistory;
