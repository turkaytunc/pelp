import { toast, ToastOptions } from 'react-toastify';

export const createToastConfig = (cb: () => void): ToastOptions => {
  return {
    position: toast.POSITION.BOTTOM_CENTER,
    onClose: () => cb(),
    autoClose: 2000,
    pauseOnHover: false,
    hideProgressBar: true,
    style: {
      fontSize: '1rem',
      padding: '0.2rem',
      width: '80%',
      marginLeft: '10%',
    },
  };
};
