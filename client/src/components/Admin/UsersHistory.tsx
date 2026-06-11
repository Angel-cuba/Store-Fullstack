import React from 'react';
import { useSelector } from 'react-redux';
import { getAllHistory } from '../../api/admin';
import { Link } from 'react-router-dom';
import { AppState } from '../../types/ProductType';
import Navbar from '../Navbar';
import Loading from '../Loading';
import SingleUserHistory from './SingleUserHistory';
import '../../styles/components/User/UsersHistory.scss';

type PurchaseRecord = {
  _id: string;
  user: { _id: string; name: string; lastname: string; picture: string };
  products: unknown[];
};

const UsersHistory = () => {
  const [fetchHistory, setFetchHistory] = React.useState<PurchaseRecord[] | null>(null);

  const [history, setHistory] = React.useState<PurchaseRecord[] | null>(null);
  const [openHistory, setOpenHistory] = React.useState<boolean>(false);

  React.useEffect(() => {
    getAllHistory().then((res) => setFetchHistory(res));
  }, []);

  if (!fetchHistory) {
    return <Loading />;
  }

  const PurchasesByUser = (thisUserId: string) => {
    const response = (fetchHistory ?? []).filter((purchase) => {
      if (purchase.user._id === thisUserId) {
        return purchase.products;
      }
      return null;
    });
    setHistory(response);
    //   if (history[0]?.user._id === thisUserId) {
    //     setOpenHistory(!openHistory);
    //   }
    setOpenHistory(!openHistory);
  };

  //Fetching uniques users
  const ids = (fetchHistory ?? []).map((x) => x.user._id);
  const filtered = (fetchHistory ?? []).filter(
    (h, index) => !ids.includes(h.user._id, index + 1)
  );

  const openSingleUserPurchase = (userId: string) => {
    console.log('click', userId);
    if (history && history[0]?.user._id === userId) {
      setOpenHistory(!openHistory);
    }
  };
  const closePurchasesByUser = () => {
    setHistory(null);
    setOpenHistory(false);
  };

  return (
    <div className="users">
      <Navbar />
      <Link to="/admin">Back</Link>
      <div className="user_content">
        {!fetchHistory ? (
          <Loading />
        ) : (
          filtered.map((product, index) => (
            <div className="user-container" key={product._id}>
              <div key={index} className="user">
                <div className="user-face">
                  <div className="user-image">
                    <img src={product.user.picture} alt="user" />
                  </div>
                  <div className="user-info">
                    <h1>
                      {product.user.name} {product.user.lastname}{' '}
                    </h1>
                  </div>
                </div>
                {/* button to show all purchases of this user */}
                <button
                  onClick={
                    openHistory ? closePurchasesByUser : () => PurchasesByUser(product.user._id)
                  }
                >
                  {openHistory && history?.[0]?.user._id === product.user._id ? 'Close' : 'Open'}
                </button>
              </div>
              {openHistory && history?.[0]?.user._id === product.user._id ? (
                <div
                  className={
                    openHistory && history?.[0]?.user._id === product.user._id
                      ? 'user-history'
                      : 'user-history-hidden'
                  }
                  onClick={() => openSingleUserPurchase(product.user._id)}
                >
                  <h3>Information </h3>
                  <div className="user-history-info" key={product.user._id}>
                    <SingleUserHistory history={history} setOpenHistory={setOpenHistory} />
                  </div>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersHistory;
