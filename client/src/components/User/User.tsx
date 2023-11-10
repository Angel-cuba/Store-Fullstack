import React from 'react';
import { Toaster } from 'react-hot-toast';
import { getAnUser, updateAnUser } from '../../api/admin';
import { handleToast } from '../../util/helpers';

const User = ({ user }: any) => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [banUser, setBanUser] = React.useState<any>({});
  console.log(banUser);

  const handleBan = (id: string) => {
    getAnUser(id).then((res) => setBanUser(res));

    setOpenDialog(!openDialog);
  };
  return (
    <div className="each_user">
      <div className="img">
        <img src={user && user.picture} alt="" />
      </div>
      <div className="full_name">
        <h2>
          {user.name} {user.lastname}
        </h2>
      </div>
      <div className="content">
        <div className="details">
          <p>{user.email}</p>
          <button className="btn" onClick={() => handleBan(user._id)}>
            {' '}
            {!user.ban ? 'Ban 🚀' : 'Banned'}
          </button>
        </div>
      </div>
      {openDialog && <UserBaned user={banUser} setOpenDialog={setOpenDialog} />}
    </div>
  );
};
export default User;

const UserBaned = ({ user, setOpenDialog }: any) => {
  console.log(user);
  const [bannedUser, setBannedUser] = React.useState<any>({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    picture: user.picture,
    ban: user.ban,
    role: user.role,
  });
  React.useEffect(() => {
    // document.title = ''
  }, [user]);

  console.log('bannedUser', bannedUser);
  const handleChange = (e: any) => {
    setBannedUser({
      ...bannedUser,
      ban: !bannedUser.ban,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      bannedUser.name === undefined ||
      bannedUser.lastname === undefined ||
      bannedUser.email === undefined ||
      bannedUser.picture === undefined ||
      bannedUser.ban === undefined ||
      bannedUser.role === undefined ||
      bannedUser.name === '' ||
      bannedUser.lastname === '' ||
      bannedUser.email === '' ||
      bannedUser.picture === '' ||
      bannedUser.ban === '' ||
      bannedUser.role === ''
    ) {
      handleToast('Error');
      setOpenDialog(false);
    } else {
      updateAnUser(user._id, bannedUser);
      handleToast('Ban an user');
      setTimeout(() => {
        setOpenDialog(false);
      }, 3000);
    }
  };

  return (
    <div className={bannedUser.ban ? 'user_banned' : 'user_ban'}>
      <div className="user_banded_details">
        <span>{bannedUser.ban ? 'Banned' : 'Not banned'}</span>
        <input type="checkbox" value={bannedUser.ban} onChange={handleChange} />
      </div>
      <div className="buttons">
        <button className="btn btn-save" onClick={handleSubmit}>
          Save
        </button>
        <button className="btn btn-cancel" onClick={() => setOpenDialog(false)}>
          Cancel
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export const Styles = {
  width: 'fit-content',
  height: '20px',
  borderRadius: '15px',
  border: '1px solid #cccccc22',
  padding: '2px 5px',
  fontSize: '16px',
  marginBottom: '10px',
  textAlign: 'center',
  color: '#333',
  backgroundColor: '#ffffffe6',
  outline: 'none',
  fontWeight: 'bold',
};
