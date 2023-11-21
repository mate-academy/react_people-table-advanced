import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.scss';
import React from 'react';

export const App = () => (
  <div data-cy="app">
  <Navbar />
  <Outlet />
  </div>
)
