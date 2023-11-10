import React from 'react';
import { Toaster } from 'react-hot-toast';
import { FaCartPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../types/ProductType';
import { ICartItem } from '../../types/types';
import { handleToast } from '../../util/helpers';
import UserButtons from './UserButtons';
import '../../styles/components/Cart.scss';

const Cart = () => {
  const [cart, setCart] = React.useState<boolean>(false);

  const { inCart } = useSelector((state: AppState) => state.cart);
  const toggleCart = () => {
    setCart(!cart);
  };

  const emptyCart = () => {
    if (cart && !inCart) {
      handleToast('Empty cart');
    }
  };
  //Function to calculate the total price of the items in the cart
  const amountToPay = (items: ICartItem[]) =>
    items.reduce((sum, item) => sum + item.price * item.amount, 0);
  return (
    <div className="cart">
      <FaCartPlus className="fa-cart" onClick={toggleCart} />
      {!inCart?.length ? null : <span className="cart-count">{inCart?.length}</span>}
      <div className="cartSide">
        <>
          {cart && (
            <>
              {inCart?.length ? (
                <Link
                  style={{
                    position: 'absolute',
                    zIndex: '300',
                    top: '25.239rem',
                    right: '482px',
                    backgroundColor: '#001a4f',
                    color: '#e2e2e2e8',
                    minWidth: '100px',
                    padding: '.53rem .87rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    margin: '3rem 1rem ',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                  to="/payment"
                >
                  Go to pay
                </Link>
              ) : null}
              {inCart?.length ? (
                <span
                  style={{
                    position: 'absolute',
                    zIndex: '300',
                    top: '28.25rem',
                    right: '215px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    backgroundColor: '#b33636',
                    padding: '.5rem 1.92rem',
                    display: 'flex',
                  }}
                >
                  {inCart && amountToPay(inCart).toFixed(2)}
                </span>
              ) : null}
            </>
          )}
        </>
        {cart && !inCart ? emptyCart() : null}

        {cart && inCart?.length ? (
          <div className="basket">
            {inCart?.map((item: any, index: number) => {
              return (
                <div className="basketItem" key={index}>
                  <div className="basketItemImg">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="basketItemInfo">
                    <div className="basketItemInfoName">{item.name.split(' ')[0]}</div>
                    <div className="buttons">
                      <span>{item.amount}</span>
                      <UserButtons product={item} />
                    </div>
                    <div className="basketItemInfoPrice">
                      {(item.price * item.amount).toFixed(2)} €
                    </div>
                  </div>
                  <Toaster />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
