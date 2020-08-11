import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input';
import './Rescue.css';
import Balance from './Balance';

const Rescue = () => {

  const [amount, setAmount] = useState('');
  return <div className='rescue'>

    <Balance />

    <div>

      <CurrencyInput
        className='input'
        value={amount}
        onChangeEvent={(event, masked, floated) => setAmount(masked)} />
    </div>

    <button>
      Resgatar
    </button>
  </div>
}

export default Rescue;
