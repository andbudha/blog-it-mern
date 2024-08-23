export const baseUrl =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/blogit'
    : 'https://blog-it-mern-server.vercel.app/blogit';
