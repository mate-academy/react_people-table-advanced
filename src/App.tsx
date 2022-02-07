import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { HomePage } from './Components/HomePage/HomePage';
import { PeoplePage } from './Components/PeoplePage/PeoplePage';

import './App.scss';

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people/:name" element={<PeoplePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route
        path="*"
        element={
          <h2 className="section">Page not found</h2>
        }
      />
      <Route
        path="/home"
        element={<Navigate to="/" />}
      />
    </Routes>
  </div>
);

export default App;
