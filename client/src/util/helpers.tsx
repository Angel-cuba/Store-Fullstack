import { toast } from 'react-hot-toast';

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.ORIGIN;

const handleEmptyFields = () => {
  toast.success('Make sure you have filled all the required', {
    position: 'top-left',
    duration: 2000,
    style: {
      background: '#00e4e8',
      color: '#0f0f0f',
      textShadow: '0px 0px 10px #c8c8c8c3',
      border: 'none',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '10px',
      textAlign: 'center',
    },
    icon: '👨🏾‍💻',
  });
};
const handleHold = () => {
  toast.success('Wait a second..., we are deleting this product', {
    position: 'top-center',
    duration: 2000,
    style: {
      background: '#e80000',
      color: '#9c9c9c',
      textShadow: '0px 0px 10px #c8c8c8c3',
      border: 'none',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '10px',
      textAlign: 'center',
    },
    icon: '❌',
  });
};
const handleMessage = () => {
  toast.success('Redirecting after message', {
    position: 'top-center',
    duration: 3000,
    style: {
      background: '#360000',
      color: '#ffffff',
      textShadow: '0px 0px 10px #c8c8c8c3',
      border: 'none',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '10px',
      textAlign: 'center',
    },
    icon: '✈️',
  });
};

const handleError = () => {
  toast.success('Something went wrong, please try again', {
    position: 'top-right',
    duration: 3000,
    style: {
      background: '#360000',
      color: '#ffffff',
      textShadow: '0px 0px 10px #c8c8c8c3',
      border: 'none',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '10px',
      textAlign: 'center',
    },
    icon: '⏳',
  });
};

const handleNetworkError = () => {
  toast.success('There is a network error, please try later', {
    position: 'top-left',
    duration: 3000,
    style: {
      background: '#360000',
      color: '#ffffff',
      textShadow: '0px 0px 10px #c8c8c8c3',
      border: 'none',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '10px',
      textAlign: 'center',
    },
    icon: '📡',
  });
};

const handleBan = () => {
  toast.success('With this you will ban this user', {
    position: 'top-left',
    duration: 2000,
    style: {
      background: '#360000',
      color: '#ffffff',
      textShadow: '0px 0px 10px #c8c8c8c3',
      border: 'none',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '10px',
      textAlign: 'center',
    },
    icon: '📡',
  });
};

const handleSave = () => {
  toast.success('Wait a second, we are saving...', {
    position: 'top-left',
    duration: 2000,
    style: {
      background: '#565b5a',
      color: '#ffdcdc',
      textShadow: '0px 0px 10px #5a5a5ac3',
      border: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '10px',
      textAlign: 'center',
    },
    icon: '🚀',
  });
};

const handleEmpty = () => {
  toast.success('Your cart is empty', {
    position: 'top-center',
    duration: 2000,
    style: {
      background: '#5c5876',
      color: '#8a7878',
      textShadow: '0px 0px 5px #40506532',
      border: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '10px',
      textAlign: 'center',
    },
    icon: '🗽',
  });
};

const handleRedirect = () => {
  toast.success('Your session has expired. Please try again to login again...', {
    position: 'top-center',
    duration: 2000,
    style: {
      background: '#360000',
      color: '#ffffff',
      textShadow: '0px 0px 10px #c8c8c8c3',
      border: 'none',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '10px',
      textAlign: 'center',
    },
    icon: '🚀',
  });
};

export const handleToast = (options: string) => {
  if (options === 'Empty fields') {
    handleEmptyFields();
  }
  if (options === 'Deleting product') {
    handleHold();
  }
  if (options === 'Message') {
    handleMessage();
  }
  if (options === 'Error') {
    handleError();
  }
  if (options === 'Network error') {
    handleNetworkError();
  }
  if (options === 'Ban an user') {
    handleBan();
  }
  if (options === 'Save') {
    handleSave();
  }
  if (options === 'Empty cart') {
    handleEmpty();
  }
  if (options === 'Redirect') {
    handleRedirect();
  }
};
