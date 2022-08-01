import './App.scss';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <Header />

        <div className="App__main">
          <Routes>
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="*" element={<><h1>Page not found</h1></>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
