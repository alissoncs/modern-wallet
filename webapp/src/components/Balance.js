import React from 'react';
// import { Link } from 'react-router-dom';
import './Balance.css';

const Balance = () => {
  return <div className='balance'>
    <span className='balance--label'>
      Total aplicado
  </span>
    <strong className='balance--amount'>
      R$ 187,00
  </strong>
  </div>
}

export default Balance;
