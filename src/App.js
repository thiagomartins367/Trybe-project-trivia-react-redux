import React from 'react';
import { Route } from 'react-router';
import Login from './pages/Login';
import './App.css';
// import logo from './trivia.png';

export default function App() {
  return (
    <main>
      <Route path="/" component={ Login } />
    </main>
  );
}
