import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Person } from './types';
import { getPeople } from './api';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const query = searchParams.get('query') || '';
  // const sex = searchParams.get('sex') || PersonSex.All;
  // const centuries = searchParams.getAll('centuries') || [];

  // const sort = searchParams.get('sort') || '';
  // const order = searchParams.get('order') || '';

  // const onQueryChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchParams(
  //     getSearchWith(searchParams, { query: ev.currentTarget.value || null }),
  //   );
  // };

  // const filteredPeople = filterPeople(people, query, sex, centuries);
  // const sortedPeople = sortPeople(filteredPeople, sort, order);

  const getPeopleData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const newPersonList = await getPeople();

      setPeople(newPersonList);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleData();
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="people">
              <Route
                index
                element={(
                  <PeoplePage
                    people={people}
                    isLoading={isLoading}
                    isError={isError}
                  />
                )}
              />

              <Route
                path=":personSlug"
                element={(
                  <PeoplePage
                    people={people}
                    isLoading={isLoading}
                    isError={isError}
                  />
                )}
              />
            </Route>

            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// import { useEffect, useState } from 'react';

// import './App.scss';
// import {
//   Navigate, Route, Routes,
// } from 'react-router-dom';
// import { Person } from './types';
// import { getPeople } from './api';
// import { Navigation } from './components/Navigation';
// import { PeoplePage } from './pages/PeoplePage';
// import { HomePage } from './pages/HomePage';
// import { PageNotFound } from './pages/PageNotFound';

// export const App: React.FC = () => {
//   const [people, setPeople] = useState<Person[]>([]);
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const getPeopleData = async () => {
//     setIsLoading(true);
//     setIsError(false);
//     try {
//       const newPersonList = await getPeople();

//       setPeople(newPersonList);
//     } catch {
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getPeopleData();
//   }, []);

//   return (
//     <div data-cy="app">

//       <Navigation />

//       <Routes>
//         <Route
//           path="/"
//           element={<HomePage />}
//         />
//         <Route path="home" element={<Navigate to="/" replace />} />

//         <Route path="people">
//           <Route
//             index
//             element={(
//               <PeoplePage
//                 people={people}
//                 isLoading={isLoading}
//                 isError={isError}
//               />
//             )}
//           />

//           <Route
//             path=":personSlug"
//             element={(
//               <PeoplePage
//                 people={people}
//                 isLoading={isLoading}
//                 isError={isError}
//               />
//             )}
//           />
//         </Route>

//         <Route
//           path="*"
//           element={<PageNotFound />}
//         />
//       </Routes>
//     </div>
//   );
// };
