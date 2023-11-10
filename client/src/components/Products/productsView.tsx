import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../types/ProductType';
import { IProducts } from '../../types/types';
import Products from './product';
import { signInSuccess } from '../../redux/actions/user.actions';
import { Input } from '../Input';
import { Styles } from '../User/User';
import '../../styles/components/Products/Products.scss';

const ProductsView = () => {
  const { allProducts } = useSelector((state: AppState) => state.products);
  const dispatch = useDispatch<any>();
  const [search, setSearch] = React.useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSearchProperties = () =>
    allProducts
      ?.filter((product: IProducts) => {
        const byName = product.name.toLowerCase().includes(search.toLowerCase());
        const byCategory = product.category.toLowerCase().includes(search.toLowerCase());
        // return byName || byCategory
        if (byName) {
          return byName;
        }
        if (byCategory) {
          return byCategory;
        }
        return null;
      })
      .map((product: IProducts) => {
        return <Products key={product._id} product={product} />;
      });
  // .slice(0, 10)

  React.useEffect(() => {
    dispatch(signInSuccess());
  }, [dispatch]);

  return (
    <div className="product_container">
      <div className="input">
        <Input
          name="Searching by category or name"
          placeholder="Searching...."
          value={search}
          onChange={handleSearch}
          style={Styles}
        />
      </div>
      {handleSearchProperties()}
    </div>
  );
};

export default ProductsView;
