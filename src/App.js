import React from 'react';
import logo from './trivia.png';
import './App.css';
import { Route } from 'react-router';
import Login from './pages/Login';

export default function App() {
  return (
    <main>
      <Route path="/" component={ Login } />
    </main>
  );
}
