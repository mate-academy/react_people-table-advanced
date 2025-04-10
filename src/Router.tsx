import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import {PeopleProvider} from './contexts/PeopleContext'
import { PeoplePage } from './components/Pages/PeoplePage';
import { HomePage } from './components/Pages/HomePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';

export const Router = () => {
  return (
      <HashRouter>
        <PeopleProvider>
          <Routes>
            <Route path='/' element={<App />}>
            <Route path="home" element={<Navigate to="/" replace />} />
              <Route index element={<HomePage />} />
              <Route path='/people' element={<PeoplePage />} />
              <Route path='/people/:personSlug' element={<PeoplePage />}/>
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </PeopleProvider>
      </HashRouter>
  )
}
