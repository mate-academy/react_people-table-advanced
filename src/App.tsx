import './App.scss';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';
import PeoplePage from './Components/PeoplaPage/PeoplePage';

const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="people">
        <Route index element={<PeoplePage />} />

        <Route path=":userSlug" element={<PeoplePage />} />
      </Route>

      <Route
        path="/home"
        element={
          <Navigate to="/" replace />
        }
      />

      <Route
        path="*"
        element={
          <h1>Page not found</h1>
        }
      />
    </Routes>
  </div>
);

export default App;
