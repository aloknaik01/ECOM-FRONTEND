import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './home.jsx';
import ProductPage from './pages/product_datails_page/ProductDetailsPage.jsx';
import { fetchUserProfile } from './store/authSlice';
import Footer from './components/footer/Footer.jsx'
<<<<<<< HEAD

=======
>>>>>>> b9bb26afde6c0219d68c81a85d2fe737ccdd670b
function AuthLoader({ children }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserProfile());
    }
  }, [accessToken, dispatch]);

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/product-details/:productId" element={<ProductPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthLoader>
          <AppRoutes />
        </AuthLoader>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
