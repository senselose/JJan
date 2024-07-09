// Container.js
import React, { useState, useEffect } from 'react';
import LoginHeader from '../LoginHeader/LoginHeader';
import Header from '../Header/Header';
import Footer from '../Footer';

const Container = ({ children, isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <LoginHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Header />
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Container;
