import React from 'react';
import { useSelector } from 'react-redux';
import { orderHistory } from '../../api/orders';
import { AppState } from '../../types/ProductType';
import Loading from '../Loading';
import '../../styles/components/User/History.scss';

const History = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { user }: any = useSelector((state: AppState) => state.user);
  const [history, setHistory] = React.useState<any>();

  React.useEffect(() => {
    if (open) {
      orderHistory().then((res) => {
        setHistory(res);
      });
    }
  }, [open, user]);

  const handle = () => {
    setOpen(!open);
  };

  const dateTime = (time: any) => {
    const date = new Date(time);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${month}/${day}/${year} at ${hours}:${minutes}:${seconds}`;
  };
  return (
    <div className={open ? 'history' : 'history_show'}>
      <div className="content">
        <div className="content-header">
          <img
            src={
              user && user.picture
                ? user.picture
                : 'https://res.cloudinary.com/dqaerysgb/image/upload/v1648218398/istockphoto-1132926013-612x612_t1xwec.jpg'
            }
            alt={user?.email}
          />
        </div>
        <button className="btn" onClick={handle}>
          {open ? 'Hide' : 'Show'}
        </button>
      </div>
      {open && (
        <div className="content-body">
          {!history ? (
            <Loading />
          ) : (
            history.map((product: any) => {
              return (
                <div key={product._id} className="each">
                  <div className="dateOfEachProd">
                    <h2>
                      Date of purchase:
                      <span>{dateTime(product.createdAt)}</span>
                    </h2>
                  </div>
                  {product.products.map((product: any, index: number) => {
                    return (
                      <div key={index} className="product">
                        <div className="product-image">
                          <img src={product.image} alt="product" />
                        </div>
                        <div className="product-info">
                          <h2>{product.name} </h2>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default History;
