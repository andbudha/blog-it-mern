import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import styles from './App.module.scss';
import { Layout } from './components/Layout/Layout';
import { Blogs } from './pages/Blogs/Blogs';
import { Signup } from './pages/Signup/Signup';
import { MyBlogs } from './pages/MyBlogs/MyBlogs';
import { MyFavorites } from './pages/MyFavorites/MyFavorites';
import { Profile } from './pages/Profile/Profile';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { Login } from './pages/Login/Login';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route index element={<Blogs />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="myblogs" element={<MyBlogs />} />
        <Route path="myfavorites" element={<MyFavorites />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return (
    <div className={styles.main_app_box}>
      <div className={styles.app_box}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
