import React from 'react';
import currencyFormatter from 'currency-formatter';

export default ({ children }) => {
  return <span class='currency'>
    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(children)}
  </span>
}
