export interface IProducts {
  _id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  category: string;
}

export type DecodedUser = {
  id: string;
  email: string;
  iat: string;
  exp: string;
  role: string;
  picture: string;
};

export type DataOfUser = {
  // name: string
  picture: string;
  id: string;
  email: string;
  role: string;
};

export type IUser = {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  picture: string;
  role: string;
  band: boolean;
};

//Cart item properties
export type ICartItem = {
  _id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  category: string;
  amount: number;
  total?: number;
};
