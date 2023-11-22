import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then((receivedPeople) => {
        setPeople(receivedPeople);
        setVisiblePeople(receivedPeople);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let preparedPeopleList = [...people];

    if (sex) {
      preparedPeopleList = preparedPeopleList
        .filter(person => person.sex === sex);
    }

    if (query) {
      const normalizedQuery = query.trim().toLowerCase();

      preparedPeopleList = preparedPeopleList.filter(person => {
        return person.name.toLowerCase().includes(normalizedQuery)
          || person.motherName?.toLowerCase().includes(normalizedQuery)
          || person.fatherName?.toLowerCase().includes(normalizedQuery);
      });
    }

    if (centuries.length) {
      preparedPeopleList = preparedPeopleList.filter(person => {
        return centuries.includes(Math.ceil(person.born / 100).toString());
      });
    }

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          preparedPeopleList = order
            ? preparedPeopleList
              .sort((a, b) => b[sort].localeCompare(a[sort]))
            : preparedPeopleList
              .sort((a, b) => a[sort].localeCompare(b[sort]));
          break;

        case 'born':
        case 'died':
          preparedPeopleList = order
            ? preparedPeopleList
              .sort((a, b) => b[sort] - a[sort])
            : preparedPeopleList
              .sort((a, b) => a[sort] - b[sort]);
          break;

        default:
          return;
      }
    }

    setVisiblePeople(preparedPeopleList);
  }, [sex, query, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading
        ? <Loader />
        : (
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              {people.length !== 0 && (
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters />
                </div>
              )}

              <div className="column">
                <div className="box table-container">

                  {isError && (
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>
                  )}

                  {(!people.length && !isError) && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {visiblePeople.length
                    ? <PeopleTable people={visiblePeople} />
                    : !isError && (
                      <p data-cy="noPeopleMessage">
                        There are no people matching the current search criteria
                      </p>
                    )}

                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};
