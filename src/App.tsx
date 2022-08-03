import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/page/PeoplePage';
import { HomePage } from './components/page/HomePage';
import { Header } from './components/UIComponents/Header';
import Footer from './components/UIComponents/Footer';
import NotFoundPage from './components/page/NotFoundPage';

const App = () => (
  <div className="App">
    <Header />
    <main>
      <Routes>
        <Route
          path="people"
        >
          <Route index element={<PeoplePage />} />

          <Route path=":userSlug" element={<PeoplePage />} />
        </Route>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
