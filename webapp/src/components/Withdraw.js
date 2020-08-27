import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input';
import './Withdraw.css';
import swal from 'sweetalert';
import Balance from './Balance';
import Links from './Links';


import Api from '../helpers/Api';

const Withdraw = ({ history }) => {

  const [amount, setAmount] = useState('');

  function submit(event) {
    event.preventDefault();

    Api
      .post('/account/withdraw', {
        machine: 'Saque e Pague',
        value: amount,
      })
      .then(() => {
        swal('Resgate realizado!');
        setAmount('');
        history.push('/account');
      }).catch(() => {

      });
  }

  return <div className='withdraw'>

    <Links />
    <Balance />

    <div>
      <CurrencyInput
        className='input'
        value={amount}
        onChangeEvent={(event, masked, floated) => setAmount(floated)} />
    </div>

    <button onClick={submit}>
      Resgatar
    </button>
  </div>
}

export default Withdraw;
