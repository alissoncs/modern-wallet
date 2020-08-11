import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input';
import './Pay.css';
import Balance from './Balance';

const Pay = () => {

  const [amount, setAmount] = useState('');
  return <div className='pay'>

    <Balance />

    <div>
      <input
        type='number'
        name=''
        title='Leitura de código de barras'
        placeholder='Código de barras'
        />
    </div>

    <button>
      OK
    </button>
  </div>
}

export default Pay;
