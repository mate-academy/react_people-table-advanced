import { Route, Routes, Navigate } from 'react-router-dom';
import { Nav } from './Components/Nav';
import { HomePage } from './Components/HomePage';
import { PeoplePage } from './Components/PeoplePage';
import { NewPerson } from './Components/NewPerson';
import { PageNotFound } from './Components/PageNotFound';

const App = () => (
  <div className="App">
    <div className="container is-max-desktop">
      <Nav />
      <Routes>
        <Route path="/people" element={<PeoplePage />}>
          <Route path="new" element={<NewPerson />} />
          <Route path=":selectedSlug" element={<></>} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  </div>
);

export default App;
