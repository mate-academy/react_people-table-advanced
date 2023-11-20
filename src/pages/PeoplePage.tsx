import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { Sex } from '../types/Sex';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const century = searchParams.getAll('century') || [];
  const normalizeQuery = query.toLowerCase().trim();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((currentPeople) => {
        setPeople(currentPeople);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function filterTable() {
    const filterSearch = people.filter((item) => {
      return item.name.toLowerCase().includes(normalizeQuery);
    });

    const filterAll = filterSearch
      .filter((item) => {
        switch (sex) {
          case Sex.Male:
            return item.sex === Sex.Male;
          case Sex.Female:
            return item.sex === Sex.Female;
          default:
            return item;
        }
      })
      .sort((a, b) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return a[sort].localeCompare(b[sort]);
          case 'born':
            return a.born - b.born;
          case 'died':
            return a.died - b.died;
          default:
            return 0;
        }
      });

    if (order === 'desc') {
      filterAll.reverse();
    }

    if (century.length) {
      return filterAll.filter((person) => {
        const centruryBorn = Math.ceil(person.born / 100);

        return century.includes(centruryBorn.toString());
      });
    }

    return filterAll;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!people.length && !isLoading && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {people.length > 0 && !isLoading && !errorMessage && (
                <PeopleTable people={filterTable()} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
