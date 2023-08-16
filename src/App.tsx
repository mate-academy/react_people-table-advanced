import {
  Navigate,
  Route,
  Routes,
  useSearchParams,
} from 'react-router-dom';

import './App.scss';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { getSearchWith } from './utils/searchHelper';

const filteredAndSortedPeople = (
  people: Person[],
  filterBy: string,
  filterByAverage: string[],
  sortedBy: string,
  order: string,
) => {
  let filteredPerson = people;
  const orders: 1 | -1 = order === 'asc' ? 1 : -1;

  switch (filterBy) {
    case 'Male':
      filteredPerson = filteredPerson
        .filter(({ sex }) => sex === 'm');
      break;
    case 'Female':
      filteredPerson = filteredPerson
        .filter(({ sex }) => sex === 'f');
      break;
    case null:
    default:
      break;
  }

  if (filterByAverage.length > 0) {
    filteredPerson = filteredPerson.filter(item => {
      return filterByAverage.includes(Math.ceil(item.born / 100).toString());
    });
  }

  switch (sortedBy) {
    case 'Name':
      filteredPerson = filteredPerson
        .sort((a, b) => (a.name.localeCompare(b.name)) * orders);
      break;
    case 'Sex':
      filteredPerson = filteredPerson
        .sort((a, b) => (a.sex.localeCompare(b.sex)) * orders);
      break;
    case 'Born':
    case 'Died':
      filteredPerson = filteredPerson
        .sort((a, b) => (+a.born - +b.born) * orders);
      filteredPerson = filteredPerson
        .sort((a, b) => (+a.died - +b.died) * orders);
      break;
    default:
      break;
  }

  return filteredPerson;
};

const isIncluded = (mainString: string, checkString: string) => {
  return mainString.toLowerCase().trim()
    .includes(checkString.toLowerCase().trim());
};

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isSelected, setIsSelected] = useState<string | null>('');
  const [isLoader, setIsLoader] = useState(true);
  const [error, setError] = useState('');
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const genders = searchParams.get('genders') || 'All';
  const centuries = searchParams.getAll('centuries') || [];
  const visiblePeople = filteredAndSortedPeople(people
    .filter(item => isIncluded(item.name, query)),
  genders, centuries, sort, order);

  const setSearchWith = (param: any) => { // eslint-disable-line
    const search = getSearchWith(searchParams, param);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(res);
        setIsLoader(false);
      }).catch(() => {
        setError('Something went wrong');
      });
  }, [people]);

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Navbar to="/" page="Home" />
            <Navbar to="/people" page="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="/people"
              element={(
                <PeoplePage
                  people={visiblePeople}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                  query={query}
                  handleQueryChange={handleQueryChange}
                  centuries={centuries}
                  genders={genders}
                  error={error}
                  isLoader={isLoader}
                  sort={sort}
                  order={order}
                />
              )}
            />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
