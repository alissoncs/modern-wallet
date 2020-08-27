import React, { useEffect, useState } from 'react';
import Api from '../helpers/Api';
import './Balance.css';
import Currency from './Util/Currency';

const Balance = () => {
  const [value, setValue] = useState(0);


  useEffect(() => {
    Api.get('/account')
    .then(({ data }) => {
      setValue(data.account.balance);
    }).catch(() => {

    });
  }, []);

  return <div className='balance'>
    <span className='balance--label'>
      Total aplicado
  </span>
    <strong className='balance--amount'>
      <Currency>{value}</Currency>
  </strong>
  </div>
}

export default Balance;
