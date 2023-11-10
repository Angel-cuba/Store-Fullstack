import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../redux/actions/products.action';
import { AppState } from '../../types/ProductType';
import '../../styles/components/Products/Products.scss';

const ProductId = () => {
  const dispatch = useDispatch<any>();
  const { productId }: any = useParams();
  const { product } = useSelector((state: AppState) => state.products);

  useEffect(() => {
    document.title = 'Product';
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  console.log(product);

  return (
    <>
      {product && (
        <div className="productById">
          <div className="product">
            <div className="img_name">
              <div className="img">
                <img src={product.image} alt="product" />
              </div>
              <div className="name">{product.name}</div>
            </div>
            <p>{product.description}</p>

            <div className="price">
              <span>{product.rating} ⭐️</span>
              <span> | </span>
              <span>{product.price} €</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductId;
