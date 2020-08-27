import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input';
import './Deposit.css';
import swal from 'sweetalert';
import Balance from './Balance';
import Links from './Links';


import Api from '../helpers/Api';

const Deposit = ({ history }) => {

  const [amount, setAmount] = useState('');

  function submit(event) {
    event.preventDefault();

    Api
      .post('/account/Deposit', {
        machine: 'Saque e Pague',
        value: amount,
      })
      .then(() => {
        swal('Depósito realizado!');
        setAmount('');
        history.push('/account');
      }).catch(() => {

      });
  }

  return <div className='Deposit'>

    <Links />
    <Balance />

    <div>
      <CurrencyInput
        className='input'
        value={amount}
        onChangeEvent={(event, masked, floated) => setAmount(floated)} />
    </div>

    <button onClick={submit}>
      Depositar
    </button>
  </div>
}

export default Deposit;
