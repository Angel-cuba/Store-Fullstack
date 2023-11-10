import axios from 'axios';

import { DecodedUser } from '../types/types';
import { BASE_URL } from '../util/helpers';
import { verifyTokenExpiration } from '../util/tokenExpired';

export const verifyToken = async () => {
  const token = localStorage.getItem('token') as string;

  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;

  try {
    const response = await axios.post(
      `${BASE_URL}/token/verify`,
      { token },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // const isVerified: boolean = response.data.isVerified;
    const decodedUser: DecodedUser = response.data.user.decodedUser;
    //const dataOfUser: DataOfUser = response.data.user.dataOfUser;
    //Data sent from the server to the client(initial state of the reducer)
    //  console.log(response.data);
    const { email, role, id, picture } = decodedUser;
    return { picture, email, role, id };
  } catch (error: any) {
    return { isVerified: false, decodedUser: null };
  }
};
