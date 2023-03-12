import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import './App.css';
import logo from './trivia.png';
import Ranking from './pages/Ranking';
import Questions from './pages/Questions ';

export default function App() {
  console.log('App renderizado');
  return (
    <BrowserRouter basename={ process.env.PUBLIC_URL }>
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/questions" component={ Questions } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/">
          <Login />
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>SUA VEZt</p>
          </header>
          {
            console.log('hearder renderizado (path: /)')
          }
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
