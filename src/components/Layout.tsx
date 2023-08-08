import React from 'react';
import Navbar from './Navbar';

type Props = {
  children: React.ReactNode,
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />

      <main className="section">
        <div className="container">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
