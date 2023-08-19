import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [users, setUsers] = useState<Person[] | null>(null);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const clearCenturies = () => {
    setSearchWith({ centuries: null });
  };

  const isInQuery = (arg: string) => {
    return !!arg.toLowerCase().includes(query.toLowerCase());
  };

  const yearToCentury = (year: number) => {
    const century = Math.ceil(year / 100);

    return century.toString();
  };

  const isCenturyChosen = (birthDate: number) => {
    if (centuries.includes(yearToCentury(birthDate))) {
      return true;
    }

    return false;
  };

  let visibleUsers = users;

  if (centuries.length > 0 && visibleUsers) {
    visibleUsers = visibleUsers.filter(user => (
      isCenturyChosen(user.born)
    ));
  }

  if (query && visibleUsers) {
    visibleUsers = visibleUsers.filter(user => (
      isInQuery(user.name)
      || isInQuery(user.motherName || '')
      || isInQuery(user.fatherName || '')
    ));
  }

  if (sex !== '' && visibleUsers) {
    visibleUsers = visibleUsers.filter(
      user => user.sex === sex,
    );
  }

  function compareNumbers(a: number, b: number, ord: string): number {
    return ord ? b - a : a - b;
  }

  function compareStrings(a: string, b: string, ord: string): number {
    return ord ? a.localeCompare(b) : b.localeCompare(a);
  }

  function customSort(a: Person, b: Person, sor: string, ord: string) {
    switch (sor) {
      case 'name':
        return compareStrings(a.name, b.name, ord);
      case 'sex':
        return compareStrings(a.sex, b.sex, ord);
      case 'born':
        return compareNumbers(a.born, b.born, ord);
      case 'died':
        return compareNumbers(a.died, b.died, ord);
      default:
        return 0;
    }
  }

  if (sort && visibleUsers) {
    visibleUsers.sort((a, b) => customSort(a, b, sort, order));
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const usersFromServer = await getPeople();

        const usersWithParents = usersFromServer.map(user => ({
          ...user,
          mother: usersFromServer.find(
            findUser => user.motherName === findUser.name,
          ),
          father: usersFromServer.find(
            findUser => user.fatherName === findUser.name,
          ),
        }));

        setUsers(usersWithParents);
      };

      fetchData();
    } catch (requestError) {
      setError('Something Went Wrong');
      throw new Error(`Failed to fetch data: ${requestError}`);
    }
  }, [query, centuries, sex]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {users && (
              <PeopleFilters
                query={query}
                handleQueryChange={handleQueryChange}
                clearCenturies={clearCenturies}
                centuries={centuries}
                sex={sex}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {!users && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {users
                && !users.length && !query && !centuries.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {((
                query || !!centuries.length
              ) && visibleUsers && !visibleUsers.length) && (
                <p>There are no people matching the current search criteria</p>
              )}

              <PeopleTable
                visibleUsers={visibleUsers}
                sort={sort}
                order={order}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
