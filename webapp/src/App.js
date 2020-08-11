import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Body from './components/Body';
import Extract from './components/Extract';
import Rescue from './components/Rescue';
import Apply from './components/Apply';
import Pay from './components/Pay';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Body>
          <Switch>
            <Route exact path='/' component={Extract} />
            <Route exact path='/resgatar' component={Rescue} />
            <Route exact path='/aplicar' component={Apply} />
            <Route exact path='/pagar' component={Pay} />
          </Switch>
        </Body>
      </HashRouter>
    </div>
  );
}

export default App;
