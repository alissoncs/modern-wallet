import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import Api from '../../helpers/Api';

const NewAccount = ({ history }) => {

  const [values, setValues] = useState({});

  // const history = useHistory();

  function login(event) {
    event.preventDefault();

    Api
      .post('/login', values)
      .then(() => {

        history.push('/account');
      }).catch(() => {

      });
  }

  function account(event) {
    event.preventDefault();
    Api
      .post('/account', values)
      .then(() => {
        swal('Conta criada com sucesso!');
      }).catch(() => {

      });
  }

  function changeField(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  return <div className='new-account'>

    <form onSubmit={login} autoComplete='off'>
      <h3>Login</h3>
      <div class='field'>
        <input type='email' name='email' placeholder='E-mail' required
          value={values.email}
          onChange={changeField} />
      </div>
      <button>
        Entrar
      </button>
    </form>

    <hr />

    <form onSubmit={account} autoComplete='off'>
      <h3>Criar conta</h3>
      <div class='field'>
        <label>E-mail</label>
        <input type='email' name='email' placeholder='E-mail' required value={values.email}
          onChange={changeField} />
      </div>
      <div class='field'>
        <label>Nome</label>
        <input type='text' name='name' placeholder='Nome' required value={values.name}
          onChange={changeField} />
      </div>
      <div class='field'>
        <label>Senha</label>
        <input type='password' name='password' placeholder='Senha' required value={values.password}
          onChange={changeField} />
      </div>
      <button>
        Criar conta
    </button>
    </form>
    <hr />
  </div>
}

export default NewAccount;
