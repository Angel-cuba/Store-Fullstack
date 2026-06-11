import React from 'react';
import { getAllUsers } from '../../api/admin';
import '../../styles/components/User/Users.scss';
import { IUser } from '../../types/types';
import User from './User';

const Users = () => {
  const [fetchUsers, setFetchUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    getAllUsers().then((res) => setFetchUsers(res?.data ?? []));
  }, []);

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
