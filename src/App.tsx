import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <Outlet />
  </div>
);
