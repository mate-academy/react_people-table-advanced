import { Route, Routes } from 'react-router-dom';
import { Layout } from './component/Layout';
import { PeoplePage } from './component/Page/PeoplePage';
import { HomePage } from './component/Page/HomePage';
import { CreatePeoplePage } from './component/Page/CreatePeoplePage';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="people/create" element={<CreatePeoplePage />} />
          <Route path="*" element={<p>Page not found!!!</p>} />
        </Route>
      </Routes>
    </div>
  );
};
