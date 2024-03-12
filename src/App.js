import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import Notfound from './Components/Notfound/Notfound';
import CounterContextProvider from './Components/Context/counterContext';
import UserContextProvider from './Components/Context/userContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Components/Context/cartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';



let routers = createHashRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'Home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'Categories', element: <ProtectedRoute><Categories /> </ProtectedRoute> },
      { path: 'Products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'Checkout/:id', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'Productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'Register', element: <Register /> },
      { path: 'Login', element: <Login /> },
      { path: '*', element: <Notfound /> },
    ]
  },


])


function App() {

  return <UserContextProvider>
          <CartContextProvider>
            <CounterContextProvider>
              <RouterProvider router={routers}></RouterProvider>
              <Toaster position="top-center" />
            </CounterContextProvider>
          </CartContextProvider>
        </UserContextProvider>

}

export default App;
