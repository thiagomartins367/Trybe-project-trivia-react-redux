import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import './App.css';
import logo from './trivia.png';
import Questions from './pages/Questions ';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/questions" component={ Questions } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/">
          <Login />
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>SUA VEZ</p>
          </header>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
