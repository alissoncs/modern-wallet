import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Body from './components/Body';
import Summary from './components/Summary';
import Withdraw from './components/Withdraw';
import Deposit from './components/Deposit';
import Pay from './components/Pay';
import NewAccount from './components/User/NewAccount';
import Currency from './components/Util/Currency';
import DateComponent from './components/Util/Date';

global.CurrencyComponent = Currency;
global.DateComponent = DateComponent;

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Body>
          <Switch>
            <Route exact path='/' component={NewAccount} />
            <Route exact path='/account/' component={Summary} />
            <Route exact path='/account/withdraw' component={Withdraw} />
            <Route exact path='/account/deposit' component={Deposit} />
            <Route exact path='/account/pay' component={Pay} />
          </Switch>
        </Body>
      </HashRouter>
    </div>
  );
}

export default App;
