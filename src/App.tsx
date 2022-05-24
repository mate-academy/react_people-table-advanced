import { Routes, Route, NavLink } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeopleTable } from './components/PeopleTable';
import { NewPerson } from './components/NewPerson';

import './App.scss';
import { PeopleProvider } from './PeopleContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <div className="nav">
          <NavLink className="nav__link" to="/">Home Page</NavLink>
          <NavLink className="nav__link" to="/people">People Page</NavLink>
        </div>
      </nav>
      <h1>People table</h1>

      <PeopleProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeopleTable />} />
          <Route path="/people/new" element={<NewPerson />} />
          <Route path="/people/:slug" element={<PeopleTable />} />
        </Routes>
      </PeopleProvider>

    </div>
  );
};

export default App;
