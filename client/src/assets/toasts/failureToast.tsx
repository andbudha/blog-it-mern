import toast from 'react-hot-toast';

export const failureToast = (message: string) =>
  toast.error(message, {
    duration: 4000,
    style: {
      border: '1px solid #ED2B2A',
      padding: '16px',
      color: '#ED2B2A',
      background: '#fff',
      fontSize: '16px',
      textAlign: 'center',
      letterSpacing: '1px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#ED2B2A',
      secondary: '#fff',
    },
  });
