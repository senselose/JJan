// Container.js
import React from 'react';
import LoginHeader from '../LoginHeader/LoginHeader';
import Header from '../Header/Header';
import Footer from '../Footer';

const Container = ({ children }) => {
  return (
    <>
      <LoginHeader />
      <Header />
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Container;