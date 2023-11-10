import React from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../api/admin';
import '../../styles/components/User/Users.scss';
import { AppState } from '../../types/ProductType';
import { IUser } from '../../types/types';
import User from './User';

const Users = () => {
  const [fetchUsers, setFetchUsers] = React.useState<IUser[] | any>([]);
  const { user } = useSelector((state: AppState) => state.user);

  React.useEffect(() => {
    getAllUsers(user?.email).then((res) => setFetchUsers(res?.data));
  }, [user]);

  return (
    <div className="users">
      {!fetchUsers ? (
        <h1>Users here</h1>
      ) : (
        fetchUsers?.map((u: IUser) => <User key={u._id} user={u} />)
      )}
    </div>
  );
};

export default Users;
