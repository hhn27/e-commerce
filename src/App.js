import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/ui/Home';
import Search from './components/ui/Search';
import ItemDetail from './components/ui/ItemDetail';
import Cart from './components/ui/Cart';
import Signup from './components/account/Signup';
import Login from './components/account/Login';
import Footer from './components/footer/Footer';
import ItemsDisplay from './components/ui/ItemsDisplay';
import Introduction from './components/ui/Introduction';
import Checkout from './components/ui/Checkout';

function App() {
  return (
    <Router>
      <div>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}>

          </Route>
          <Route path="/about" >
            
          </Route>
          <Route path="/gioithieu"  element= {<Introduction></Introduction>}>

          </Route>
          <Route path="/dangnhap" element={<Login></Login>}>
            
          </Route>
          <Route path="/dangky" element={<Signup></Signup>}>
            
          </Route>
          <Route path="/search/:input"  element= {<Search> </Search>}>

          </Route>
          <Route path="/search/:input/:category/:price"  element= {<Search> </Search>}>

          </Route>
          <Route path="/search/:input/:category/"  element= {<Search> </Search>}>

          </Route>
          <Route path="/search/:input/:price/"  element= {<Search> </Search>}>

          </Route>
          <Route path="/sanpham/"  element= {<ItemsDisplay></ItemsDisplay>}>

          </Route>
          <Route path="/sanpham/:category/:price/"  element= {<ItemsDisplay> </ItemsDisplay>}>

          </Route>
          <Route path="/sanpham/:category/"  element= {<ItemsDisplay> </ItemsDisplay>}>

          </Route>
          <Route path="/sanpham/:price/"  element= {<ItemsDisplay> </ItemsDisplay>}>

          </Route>
          <Route path="/sanpham/masanpham/:itemId"  element= {<ItemDetail></ItemDetail>}>

          </Route>
          <Route path="/giohang"  element= {<Cart></Cart>}>

          </Route>
          <Route path='/thanhtoan' element= {<Checkout></Checkout>}>

          </Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.


export default App;
