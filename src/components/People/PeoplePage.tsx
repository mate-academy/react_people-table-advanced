import { Filters } from '../Filters/Filters';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsloading] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const sexParam = useMemo(() => {
    if (sex === 'm') {
      return 'male';
    } else if (sex === 'f') {
      return 'female';
    } else {
      return 'all';
    }
  }, [sex]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsloading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let visible = [...people];

    if (sex) {
      switch (sexParam) {
        case 'male':
          visible = visible.filter(person => person.sex === 'm');
          break;
        case 'female':
          visible = visible.filter(person => person.sex === 'f');
          break;
        default:
          break;
      }
    }

    if (query) {
      visible = visible.filter(
        item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          item.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length) {
      visible = visible.filter(item =>
        centuries.includes(Math.ceil(item.born / 100).toString()),
      );
    }

    return visible;
  }, [sexParam, sex, query, centuries, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <Filters sexParam={sexParam} />
              </div>

              <div className="column">
                <div className="box table-container">
                  {errorMessage && (
                    <p data-cy="peopleLoadingError">{errorMessage}</p>
                  )}

                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {/* <p>There are no people matching the current search criteria</p> */}

                  {!!people.length && (
                    <PeopleTable filteredPeople={visiblePeople} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
