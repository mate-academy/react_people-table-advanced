import { Navbar } from './components/Navbar';

import './App.scss';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const App: React.FC<Props> = ({ children }) => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">{children}</div>
      </div>
    </div>
  );
};
