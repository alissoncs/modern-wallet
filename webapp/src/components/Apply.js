import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input';
import './Apply.css';
import Balance from './Balance';

const Apply = () => {

  const [amount, setAmount] = useState('');
  return <div className='Apply'>

    <Balance />

    <div>
      <CurrencyInput
        className='input'
        value={amount}
        onChangeEvent={(event, masked, floated) => setAmount(masked)} />
    </div>

    <button>
      Aplicar
    </button>
  </div>
}

export default Apply;
