import React from 'react';
import { Link } from 'react-router-dom';

const Body = ({ children }) => {
  return <div className='body'>
    <h1 className='app-title'>
      Modern Wallet
    </h1>

    <main className='body-content'>
      {children}
    </main>
  </div>
}

export default Body;
