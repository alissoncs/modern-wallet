import React, { useState } from 'react';
import './Pay.css';
import Balance from './Balance';
import swal from 'sweetalert';
import Links from './Links';
import Api from '../helpers/Api';

const Pay = ({ history }) => {

  const [bar, setBar] = useState('');

  function submitCheck(event) {

    event.preventDefault();
    const data = {
      value: Math.floor((Math.random() * 400) + 1),
    };

    const formated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.value);

    swal({
      text: `Boleto reconhecido. Deseja pagar o boleto de ${formated}?`,
      title: 'Confirmação',
      confirm: true,
      buttons: true,
      dangerMode: true,
    }).then((c) => {
      if (c) {
        submit(data);
      }
    });
  }

  function submit(data) {
    Api
      .post('/account/payment', {
        ...data,
      })
      .then(() => {
        swal('Pagamento realizado!');

        history.push('/account');
      }).catch(() => {

      });
  }

  return <div className='pay'>

    <Links />
    <Balance />

    <div>
      <input
        type='number'
        name=''
        title='Leitura de código de barras'
        placeholder='Código de barras'
        // value={amoun}
        />
    </div>

    <button onClick={submitCheck}>
      Pagar
    </button>
  </div>
}

export default Pay;
