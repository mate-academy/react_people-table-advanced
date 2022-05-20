import './App.scss';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Home } from './Home';
import { People } from './People';
import { NotFound } from './NotFound';
import { Header } from './Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />}>
            <Route path=":slug" element={<People />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
