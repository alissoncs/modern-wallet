import React from 'react';
import moment from 'moment';

export default ({ children }) => {
  return <span class='currency'>
    {moment(children).format('DD/MM/YYYY HH:mm')}
  </span>
}
