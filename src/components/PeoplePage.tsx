import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const sexStatus = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortType = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPeople = useMemo(() => {
    let result = [...people];

    switch (sexStatus) {
      case 'f':
        result = result.filter(person => person.sex === 'f');
        break;
      case 'm':
        result = result.filter(person => person.sex === 'm');
        break;
    }

    if (query) {
      result = result.filter(person => person.name.includes(query));
    }

    if (centuries.length) {
      result = centuries.reduce<Person[]>((acc, c) => {
        const filtered = result.filter(
          person => +person.born.toString().slice(0, 2) === +c - 1,
        );

        return [...acc, ...filtered];
      }, []);
    }

    if (sortType) {
      result = result.sort((a, b) => {
        switch (sortType) {
          case 'name':
            return sortOrder === 'desc'
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name);

          case 'sex':
            return sortOrder === 'desc'
              ? b.sex.localeCompare(a.sex)
              : a.sex.localeCompare(b.sex);

          case 'born':
            return sortOrder === 'desc' ? b.born - a.born : a.born - b.born;

          case 'died':
            return sortOrder === 'desc' ? b.born - a.born : a.born - b.born;

          default:
            return 0;
        }
      });
    }

    return result;
  }, [people, centuries, query, sexStatus, sortOrder, sortType]);

  const isPeopleEmpty = !filteredPeople.length && !isLoading;
  const showPeopleTable = !isLoading && filteredPeople.length;

  return (
    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        {!isLoading && (
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
        )}

        <div className="column">
          <div className="box table-container">
            <h1 className="title">People Page</h1>

            {isLoading && <Loader />}

            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!people.length && !isLoading && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {isPeopleEmpty ? (
              <p>There are no people matching the current search criteria</p>
            ) : (
              showPeopleTable && <PeopleTable people={filteredPeople} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
