import React from 'react';
import { useSelector } from 'react-redux';
import { getAllHistory } from '../../api/admin';
import { Link } from 'react-router-dom';
import { AppState } from '../../types/ProductType';
import Navbar from '../Navbar';
import Loading from '../Loading';
import SingleUserHistory from './SingleUserHistory';
import '../../styles/components/User/UsersHistory.scss';

const UsersHistory = () => {
  const { user } = useSelector((state: AppState) => state.user);
  const [fetchHistory, setFetchHistory] = React.useState<any>(null);
  const [history, setHistory] = React.useState<any>(null);
  const [openHistory, setOpenHistory] = React.useState<any>(false);
  console.log('history', history);
  console.log('the history of all users', fetchHistory);

  React.useEffect(() => {
    getAllHistory(user?.email).then((res) => setFetchHistory(res));
  }, [user]);

  if (!fetchHistory) {
    return <Loading />;
  }

  const PurchasesByUser = (thisUserId: any) => {
    const response = fetchHistory.filter((purchase: any) => {
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
  const ids = fetchHistory.map((x: any) => x.user._id);
  const filtered = fetchHistory.filter(
    (history: any, index: number) => !ids.includes(history.user._id, index + 1)
  );

  const openSingleUserPurchase = (userId: any) => {
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
          filtered.map((product: any, index: number) => (
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
                  {openHistory && history[0].user._id === product.user._id ? 'Close' : 'Open'}
                </button>
              </div>
              {openHistory && history[0].user._id === product.user._id ? (
                <div
                  className={
                    openHistory && history[0].user._id === product.user._id
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
