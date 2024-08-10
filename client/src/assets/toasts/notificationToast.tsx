import toast from 'react-hot-toast';

export const notificationToast = (message: string) =>
  toast.success(message, {
    duration: 4000,
    position: 'top-center',
    style: {
      border: '1px solid #fc6736',
      padding: '16px',
      color: '#fc6736',
      fontSize: '1rem',
      textAlign: 'center',
      letterSpacing: '1px',
      fontWeight: '600',
    },
    iconTheme: {
      primary: '#fc6736',
      secondary: '#fff',
    },
  });
