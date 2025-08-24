import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './Navbar';
import HomePage from './HomePage';
import { PeoplePage } from './PeoplePage';
import NotFoundPage from './NotFoundPage';

const Root = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Root;
