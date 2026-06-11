import React from 'react';
import { Toaster } from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { DeletingProduct } from '../../api/requests';
import { fetchAllProducts } from '../../redux/actions/products.action';
import { AppState } from '../../types/ProductType';
import { AppDispatch } from '../../redux/store';
import { verifyTokenExpiration } from '../../util/tokenExpired';
import { IProducts } from '../../types/types';
import UserButtons from './UserButtons';
import { handleToast } from '../../util/helpers';

const Products = ({ product }: { product: IProducts }) => {
  const location = useLocation();
  const [adminLocation, setAdminLocation] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) verifyTokenExpiration(token);
    //Check if user is admin
    if (location.pathname.includes('admin')) {
      setAdminLocation(true);
    }
  }, [location]);

  const handleDelete = (id: string) => {
    DeletingProduct(id);
    handleToast('Deleting product');
  };

  const handleMessage = () => {
    setTimeout(() => {
      dispatch(fetchAllProducts());
    }, 3500);
  };

  return (
    <div className="single_product">
      <div className="image">
        <img
          src={
            product
              ? product.image
              : 'https://res.cloudinary.com/dqaerysgb/image/upload/v1648218398/istockphoto-1132926013-612x612_t1xwec.jpg'
          }
          alt={product.name}
        />
      </div>
      <div className="info">
        <span>Category: {product.category}</span>
        <div className="info_small">
          <div className="left">
            <small>Name</small>
            <p>{product.name.split(' ')[0]}</p>
          </div>
          <div className="right">
            <small>Price</small>
            <p>{product.price}</p>
          </div>
          <div className="right">
            <small>Rating</small>
            <p>{product.rating}</p>
          </div>
        </div>
        <div className="buttons">
          {!adminLocation ? (
            <UserButtons product={product} />
          ) : (
            <Link to={`/admin/${product._id}/editing`}>
              <button className="btn btn-edit">Edit</button>
            </Link>
          )}
          <Link to={`/product/${product._id}`}>
            <button className="btn btn-details">Details</button>
          </Link>
        </div>
        <div className="" onClick={handleMessage}>
          {adminLocation && (
            <button className="btn-delete" onClick={() => product._id && handleDelete(product._id)}>
              <FaTrashAlt />
            </button>
          )}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Products;
