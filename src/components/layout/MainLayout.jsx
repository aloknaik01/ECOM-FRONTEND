import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../redux/slices/authSlice';
import Cookies from 'js-cookie';
import Header from './Header';
import Footer from './Footer';
import { Loader } from '../common/Loader';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  if (isLoading && token) {
    return <Loader fullScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;