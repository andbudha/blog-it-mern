import toast from 'react-hot-toast';

export const successfulToast = (message: string) =>
  toast.success(message, {
    duration: 4000,
    style: {
      border: '1px solid #fc6736',
      padding: '16px',
      color: '#fc6736',
      fontSize: '16px',
      textAlign: 'center',
      letterSpacing: '1px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fc6736',
      secondary: '#fff',
    },
  });
