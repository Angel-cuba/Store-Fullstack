import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent, sendOrder } from '../../api/orders';
import '../../styles/components/Products/Payments.scss';
import { AppState } from '../../types/ProductType';
import { AppDispatch } from '../../redux/store';
import { ICartItem } from '../../types/types';
import { CLEAR_CART } from '../../types/CartActions';
import { handleToast } from '../../util/helpers';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

const amountToPay = (items: ICartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.amount, 0);

// Inner form — only rendered inside <Elements> so useStripe/useElements work
type AddressFields = {
  fullName: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

const CheckoutForm = ({
  productIds,
  shippingAddress,
  onSuccess,
}: {
  productIds: string[];
  shippingAddress: AddressFields;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed');
      setLoading(false);
      return;
    }

    const { fullName, address, city, state, country } = shippingAddress;
    const addressString = [fullName, address, city, state, country]
      .filter(Boolean)
      .join(', ');

    try {
      await sendOrder({ products: productIds, shippingAddress: addressString });
    } catch {
      setError('Payment succeeded but order could not be recorded. Please contact support.');
      setLoading(false);
      return;
    }
    onSuccess();
    handleToast('Save');
    setLoading(false);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
      <div className="buttons" style={{ marginTop: '1rem' }}>
        <button className="btn-payment" type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
        <button className="btn-payment" type="button" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </form>
  );
};

const Payment = () => {
  const { inCart } = useSelector((state: AppState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [address, setAddress] = React.useState<AddressFields>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });

  const productIds = (inCart ?? [])
    .map((item: ICartItem) => item._id)
    .filter((id): id is string => id !== undefined);

  const total = inCart ? amountToPay(inCart) : 0;

  const handleAddressChange =
    (field: keyof AddressFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress((prev) => ({ ...prev, [field]: e.target.value }));
    };

  React.useEffect(() => {
    document.title = 'Payment';
    if (total > 0) {
      createPaymentIntent(total).then((res) => {
        if (res?.clientSecret) setClientSecret(res.clientSecret);
      });
    }
  }, [total]);

  return (
    <div className="container">
      <Link
        style={{
          backgroundColor: '#001a4f',
          color: '#e2e2e2e8',
          padding: '.53rem .87rem',
          borderRadius: '6px',
          textDecoration: 'none',
          margin: '3rem 1rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
        to="/"
      >
        Back to Home
      </Link>

      <div className="view">
        <div className="payment_data">
          {!inCart || inCart.length === 0
            ? 'Go to buy some products'
            : inCart.map((item: ICartItem, index: number) => (
                <div className="payment_item" key={index}>
                  <div className="payment_item_img">
                    <img src={item.image} alt="" />
                    {item.amount}
                  </div>
                  <p className="payment_item_name">{item.name}</p>
                  <p style={{ color: 'gray' }}>{item.price}</p>
                  <p className="payment_item_price">{(item.amount * item.price).toFixed(2)} €</p>
                </div>
              ))}
        </div>

        <div className="user_data">
          <input type="text" placeholder="Full name" value={address.fullName} onChange={handleAddressChange('fullName')} />
          <input type="text" placeholder="Address" value={address.address} onChange={handleAddressChange('address')} />
          <input type="text" placeholder="City" value={address.city} onChange={handleAddressChange('city')} />
          <input type="text" placeholder="State" value={address.state} onChange={handleAddressChange('state')} />
          <input type="text" placeholder="Country" value={address.country} onChange={handleAddressChange('country')} />

          <span style={{ margin: '1rem 0', display: 'block' }}>
            Total: {total.toFixed(2)} €
          </span>

          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                productIds={productIds}
                shippingAddress={address}
                onSuccess={() => dispatch({ type: CLEAR_CART })}
              />
            </Elements>
          ) : total > 0 ? (
            <p>Loading payment form...</p>
          ) : null}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Payment;
