import { useEffect, useMemo, useState } from 'react';

import PeopleTable from '../PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [preparedPeople, setPreparedPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsloading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsloading(false));
  }, []);

  const query = useMemo(() => {
    return searchParams.get('query') || '';
  }, [searchParams]);

  const sex = useMemo(() => {
    return searchParams.get('sex') || '';
  }, [searchParams]);

  const [centuries] = useMemo(() => {
    return [searchParams.getAll('centuries') || []];
  }, [searchParams]);

  const sortByParams = useMemo(() => {
    return searchParams.get('sort') || '';
  }, [searchParams]);

  const orderByParams = useMemo(() => {
    return searchParams.get('order') || '';
  }, [searchParams]);

  useMemo(() => {
    setPreparedPeople([...people]);

    if (query) {
      setPreparedPeople(currentPeople =>
        currentPeople.filter(
          person =>
            person.name.toLowerCase().includes(query.toLowerCase()) ||
            person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
            person.motherName?.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }

    if (sex) {
      setPreparedPeople(currentPeople =>
        currentPeople.filter(person => person.sex === sex),
      );
    }

    if (centuries.length > 0) {
      setPreparedPeople(currentPeople =>
        currentPeople.filter(person =>
          centuries.includes(`${Math.ceil(person.born / 100)}`),
        ),
      );
    }

    if (sortByParams) {
      switch (sortByParams) {
        case 'name':
          setPreparedPeople(currentPeople =>
            currentPeople.sort((a, b) => a.name.localeCompare(b.name)),
          );
          break;

        case 'sex':
          setPreparedPeople(currentPeople =>
            currentPeople.sort((a, b) => a.sex.localeCompare(b.sex)),
          );
          break;

        case 'born':
          setPreparedPeople(currentPeople =>
            currentPeople.sort((a, b) => a.born - b.born),
          );
          break;

        case 'died':
          setPreparedPeople(currentPeople =>
            currentPeople.sort((a, b) => a.died - b.died),
          );
          break;
      }
    }

    if (orderByParams) {
      setPreparedPeople(currentPeople => currentPeople.reverse());
    }

    return people;
  }, [people, query, sex, centuries, sortByParams, orderByParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isLoading && <Loader />}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && (
                <PeopleTable
                  people={preparedPeople}
                  sortByParams={sortByParams}
                  orderByParams={orderByParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
