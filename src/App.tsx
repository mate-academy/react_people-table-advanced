import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Homepage } from './Pages/HomePage/HomePage';
import { PeoplePage } from './Pages/PeoplePage/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { Header } from './Pages/Header/Header';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Homepage />} />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);

export default App;
