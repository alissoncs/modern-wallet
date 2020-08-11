import React from 'react';
import { Link } from 'react-router-dom';

const Body = ({ children }) => {
  return <div className='body'>
    <h1 className='app-title'>
      Modern Wallet
    </h1>
    <header class='header'>
      <Link to='/' className='header--link'>
        Extrato
      </Link>
      <Link to='/resgatar' className='header--link'>
        Resgatar
      </Link>
      <Link to='/aplicar' className='header--link'>
        Aplicar
      </Link>
      <Link to='/pagar' className='header--link'>
        Pagar
      </Link>
    </header>
    <main className='body-content'>
      {children}
    </main>
  </div>
}

export default Body;
