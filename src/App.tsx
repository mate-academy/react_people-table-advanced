import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => {
  const htmlElement = document.querySelector('html') as HTMLHtmlElement;

  htmlElement.className = 'has-navbar-fixed-top';

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
