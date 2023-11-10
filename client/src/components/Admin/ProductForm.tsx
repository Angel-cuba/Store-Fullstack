import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditingProduct, NewProduct } from '../../api/requests';
import { Styles } from '../../pages/FirsLoginPage';
import { fetchProductById } from '../../redux/actions/products.action';
import '../../styles/components/Admin/ProductForm.scss';
import { AppState } from '../../types/ProductType';
import { handleToast } from '../../util/helpers';
import { Input } from '../Input';
import View from './View';

const ProductForm = () => {
  const { id }: any = useParams();
  const dispatch = useDispatch<any>();

  const { product } = useSelector((state: AppState) => state.products);
  const { user } = useSelector((state: AppState) => state.user);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);

  const body = { name, description, image, category, rating, price };
  if (!name || !description || !image || !category || (!rating && price < 0)) {
    handleToast('Please fill all fields');
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  //Value handlers
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };
  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const test = () => {
    handleToast('Empty fields');
  };

  const handleSubmit = () => {
    if (id) {
      EditingProduct(id, body, user?.email);
    } else {
      NewProduct(body, user?.email);
      //Adding some animation
      handleToast('Save');
      //Setting all fields to default
      setName('');
      setDescription('');
      setImage('');
      setCategory('');
      setRating(0);
      setPrice(0);
    }
  };

  // navigate('/')
  return (
    <div className="productForm">
      <div className="container">
        <div className="form">
          <h1>{id ? 'Editing Product' : 'New Product'}</h1>

          <Input
            type="text"
            name="name"
            placeholder={!id ? 'Name' : `${product?.name}`}
            value={name}
            onChange={handleName}
            style={Styles}
            message={id && product?.name}
          />
          <Input
            type="text"
            name="description"
            placeholder={!id ? 'Description' : `${product?.description}`}
            value={description}
            onChange={handleDescription}
            style={Styles}
            message={id && product?.description}
          />
          <Input
            type="text"
            name="image"
            placeholder={!id ? 'Image' : `${product?.image}`}
            value={image}
            onChange={handleImage}
            style={Styles}
            message={id && product?.image}
          />
          <Input
            type="text"
            name="category"
            placeholder={!id ? 'Category' : `${product?.category}`}
            value={category}
            onChange={handleCategory}
            style={Styles}
            message={id && product?.category}
          />
          <Input
            type="number"
            name="rating"
            placeholder={id ? 'Rating' : `${product?.rating}`}
            value={rating}
            onChange={handleRating}
            style={Styles}
            message={id && product?.rating}
          />
          <Input
            type="number"
            name="price"
            placeholder={id ? `The price is ${product?.price} €` : 'Price'}
            value={price}
            onChange={handlePrice}
            style={Styles}
            message={id && `${product?.price} €`}
          />
          {(id && (!name || !description || !image || !category || !rating || !price)) ||
          !name ||
          !description ||
          !image ||
          !category ||
          !rating ||
          !price ? (
            <button onClick={test}>Button disabled</button>
          ) : (
            <button onClick={handleSubmit}>{id ? 'Editing' : 'Save'}</button>
          )}
        </div>
        <div className="view">
          <h1>This is how the new product will look like!</h1>
          <View body={body} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductForm;
