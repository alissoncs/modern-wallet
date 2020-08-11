import React from 'react';
import { Link } from 'react-router-dom';
import './Extract.css';
import Balance from './Balance';

const Extract = () => {
  return <div className='extract'>

    <Balance />

    <ul>
      <li className='extract--item extract--item--out'>
        <span className='extract--type'>
          Resgate
        </span>
        <span class='extract--amount'>
          -R$ 2928,00
        </span>
      </li>
      <li className='extract--item extract--item--in'>
        <span className='extract--type'>
          Aplicação
        </span>
        <span class='extract--amount'>
          R$ 29,00
        </span>
      </li>
      <li className='extract--item extract--item--out'>
        <span className='extract--type'>
          Resgate
        </span>
        <span class='extract--amount'>
         -R$ 400,00
        </span>
      </li>
    </ul>
  </div>
}

export default Extract;
