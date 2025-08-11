import React from 'react';
import { Navbar } from './Navbar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
