import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return <header class='header'>
    <Link to='/account' className='header--link'>
      Extrato
      </Link>
    <Link to='/account/withdraw' className='header--link'>
      Resgatar
      </Link>
    <Link to='/account/deposit' className='header--link'>
      Depositar
      </Link>
    <Link to='/account/pay' className='header--link'>
      Pagar
    </Link>
  </header>
}
