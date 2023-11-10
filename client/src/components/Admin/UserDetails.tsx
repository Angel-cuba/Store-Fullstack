import React from 'react';
import { Link } from 'react-router-dom';

const UserDetails = ({ product }: any) => {
  return (
    <div className="user-details">
      <div className="user-image">
        <img src={product.image} alt="user" />
      </div>
      <p>{product.name}</p>
      <Link to={`/product/${product._id}`}>Details</Link>
    </div>
  );
};

export default UserDetails;
