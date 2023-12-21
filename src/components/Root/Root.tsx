import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from '../../App';
import { Home } from '../../page/Home';
import { PageNotFound } from '../../page/PageNotFound';
import { Poeple } from '../../page/Poeple';
import { TablePeople } from '../../page/TablePeople';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="people" element={<Poeple />}>
        {/* <Route index path="*" element={<PeoplePage />} /> */}
        <Route index path="*" element={<TablePeople />} />
        {/* </Route> */}
        <Route index path=":slug" element={<TablePeople />} />
      </Route>
    </Route>
  </Routes>
);
