import { Route, Routes } from 'react-router-dom';
import { Layout } from './component/Layout';
import { Homepage } from './component/Page/Homepage';
import { CreatePeoplePage } from './component/Page/CreatePeoplePage';
import { Peoplepage } from './component/Page/Peoplepage';

import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="people" element={<Peoplepage />}>
            <Route path=":slug" element={<Peoplepage />} />
          </Route>
          <Route path="people/create" element={<CreatePeoplePage />} />
          <Route path="*" element={<p>Page not found!!!</p>} />
        </Route>
      </Routes>
    </div>
  );
};
