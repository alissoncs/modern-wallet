import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Summary.css';
import Balance from './Balance';
import Currency from './Util/Currency';
import DateComponent from './Util/Date';
import Links from './Links';
import Api from '../helpers/Api';

const Summary = () => {
  const [summary, setSummary] = useState([]);
  useEffect(() => {
    Api.get('/account/summary')
      .then(({ data }) => {
        setSummary(data.summary);
      }).catch(() => {

      });
  }, []);

  return <div className='summary'>

    <Links />
    <Balance />


    <table>
      {summary.map(({
        operation,
        value,
        paymentDetail,
        date,
      }) => {

        if (operation === 0) {
          return <tr className='summary--item summary--item--in'>
            <td className='summary--type'>
              Depósito
            </td>
            <td className='summary--type'>
              Depósito na conta
            </td>
            <td className='summary--type'>
              <DateComponent>{date}</DateComponent>
            </td>
            <td class='summary--amount'>
              +<Currency>{value}</Currency>
            </td>
          </tr>;
        }
        if (operation === 1) {
          return <tr className='summary--item summary--item--in'>
            <td className='summary--type'>
              Resgate
            </td>
            <td className='summary--type'>
              Resgate de dinheiro da conta
            </td>
            <td className='summary--type'>
              <DateComponent>{date}</DateComponent>
            </td>
            <td class='summary--amount'>
              -<Currency>{value}</Currency>
            </td>
          </tr>;
        }
        if (operation === 2) {
          return <tr className='summary--item summary--item--in'>
            <td className='summary--type'>
              Pagamento
            </td>
            <td className='summary--type'>
              {paymentDetail}
            </td>
            <td className='summary--type'>
              <DateComponent>{date}</DateComponent>
            </td>
            <td class='summary--amount'>
              -<Currency>{value}</Currency>
            </td>
          </tr>;
        }
        return null;
      })}

    </table>
  </div>
}

export default Summary;
