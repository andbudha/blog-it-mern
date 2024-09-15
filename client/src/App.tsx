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
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { PaginationProvider } from './contexts/PaginationContext';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { DetailedBlog } from './pages/DetailedBlog/DetailedBlog';
import { About } from './pages/About/About';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={
          <AuthProvider>
            <DataProvider>
              <PaginationProvider>
                <Layout />
              </PaginationProvider>
            </DataProvider>
          </AuthProvider>
        }
      >
        <Route index element={<About />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route
          path="myblogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="myfavorites"
          element={
            <ProtectedRoute>
              <MyFavorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="blog/:blogID" element={<DetailedBlog />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return (
    <div className={styles.main_app_box}>
      <Toaster />
      <div className={styles.app_box}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
