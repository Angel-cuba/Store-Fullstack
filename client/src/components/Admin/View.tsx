import React from 'react';
import { Toaster } from 'react-hot-toast';

const View = ({ body }: any) => {
  return (
    <div>
      <h2>{body.name ? body.name : 'Missing name'}</h2>
      <h2>{body.description ? body.description : 'Missing description'}</h2>
      <h2>{body.image ? body.image : 'Missing image'}</h2>
      <h2>{body.category ? body.category : 'Missing category'}</h2>
      <h2>{body.rating ? body.rating : 'Missing category'}</h2>
      <h2>{body.price ? `${body.price} €` : 'Missing price'}</h2>
      <Toaster />
    </div>
  );
};

export default View;
