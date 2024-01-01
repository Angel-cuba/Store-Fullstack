import React from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ProductForm from '../components/Admin/ProductForm';
import Navbar from '../components/Navbar';
import ProductsView from '../components/Products/productsView';
import Users from '../components/User/Users';
import '../styles/pages/Admin.scss';
import { verifyTokenExpiration } from '../util/tokenExpired';

const Admin = () => {
  const [openNewProduct, setOpenNewProduct] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const [openUsers, setOpenUsers] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Admin';
    const token = localStorage.getItem('token') as any;

    if (!token) {
      // window.location.href = '/'
      navigate('/login');
    }
    verifyTokenExpiration(token);
  }, [navigate]);

  const handleNewProduct = () => {
    setOpenProducts(false);
    setOpenUsers(false);

    setOpenNewProduct(!openNewProduct);
  };

  const handleOpenProducts = () => {
    setOpenNewProduct(false);
    setOpenUsers(false);

    setOpenProducts(!openProducts);
  };

  const handleClose = () => {
    setOpenNewProduct(false);
    setOpenProducts(false);
    setOpenUsers(false);
  };

  const handleFetchUsers = () => {
    setOpenNewProduct(false);
    setOpenProducts(false);
    setOpenUsers(!openUsers);
  };

  return (
    <>
      <div className={!openProducts && !openNewProduct && !openUsers ? 'admin-empty' : 'admin'}>
        <Navbar />
        <Link
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            textDecoration: 'none',
            backgroundColor: '#d3d3d3',
            padding: '.53rem .87rem',
            borderRadius: '6px',
            margin: '.51rem',
            fontWeight: 'bold',
          }}
          to="/history"
        >
          All users history
        </Link>

        <div className="admin_links">
          <button className="btn" onClick={handleNewProduct}>
            New Product
          </button>
          <button className="btn" onClick={handleOpenProducts}>
            Products
          </button>
          <button className="btn" onClick={handleFetchUsers}>
            Users
          </button>

          <div className="btnClose">
            {(openNewProduct || openProducts || openUsers) && (
              <FaWindowClose className="close" onClick={handleClose} />
            )}
          </div>
        </div>
      </div>
      {openNewProduct && <ProductForm />}
      {openProducts && <ProductsView />}
      {openUsers && <Users />}
    </>
  );
};

export default Admin;
