import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/admin/Login';
import  UserLogin from './components/user/Login';
import Products from './components/admin/Products';
import Category from './components/admin/Category';
import Type from './components/admin/Type';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/user/Home';
import ViewCart from './components/user/ViewCart';
import Checkout from './components/user/Checkout';
import ThankYou from './components/user/ThankYou';
import Order from './components/user/Order';
import Register from './components/user/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />}> */}
          <Route path="admin-login" element={<Login />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/view-cart" element={<ViewCart />} />
          <Route path="/view-order" element={<Order />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/register" element={<Register />} />
          <Route path="manage-product" element={<Products />} />
          <Route path="manage-category" element={<Category />} />
          <Route path="manage-type" element={<Type />} />
          
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
