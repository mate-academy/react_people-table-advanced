import { Navbar } from './components/Navbar';
import './App.scss';
import { Root } from './Root';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Root />
        </div>
      </div>
    </div>
  );
};
