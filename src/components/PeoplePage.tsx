import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [users, setUsers] = useState<Person[] | null>(null);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSearchWith = (params: any) => {
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
    if (arg.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }

    return false;
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

  if (query && users) {
    visibleUsers = users.filter(user => (
      isInQuery(user.name)
      || isInQuery(user.motherName ? user.motherName : '')
      || isInQuery(user.fatherName ? user.fatherName : '')
    ));
  }

  if (sex !== '' && users) {
    visibleUsers = users.filter(
      user => user.sex === sex,
    );
  }

  if (centuries.length > 0 && users) {
    visibleUsers = users.filter(user => (
      isCenturyChosen(user.born)
    ));
  }

  function customSort(a: any, b: any, sor: string, ord: string) {
    switch (sor) {
      case 'name':
        return ord ? b.name.localeCompare(
          a.name,
        ) : a.name.localeCompare(b.name);
      case 'sex':
        return ord ? b.sex.localeCompare(
          a.sex,
        ) : a.sex.localeCompare(b.sex);
      case 'born':
        return ord ? b.born - a.born : a.born - b.born;
      case 'died':
        return ord ? b.died - a.died : a.died - b.died;
      default:
        return null;
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
                && !users.length && query === '' && centuries.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {((
                query !== '' || centuries.length > 0
              ) && users && users.length === 0) && (
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
