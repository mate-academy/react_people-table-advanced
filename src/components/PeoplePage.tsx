import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [loadingError, setLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex');

  async function loadPeople() {
    setIsLoading(true);
    try {
      setLoadingError(false);
      const response = await getPeople();

      setPeople(response);
    } catch (e) {
      setLoadingError(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadPeople();
  }, []);

  const visiblePeople = useMemo(() => {
    let sortedPeople = [...people];

    if (query !== null) {
      sortedPeople = sortedPeople.filter(person => {
        return person.name.toLowerCase().includes(query.toLowerCase())
          || person.motherName?.toLowerCase().includes(query.toLowerCase())
          || person.fatherName?.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (sex !== null) {
      sortedPeople = sortedPeople.filter(person => {
        return person.sex === sex;
      });
    }

    if (centuries.length > 0) {
      sortedPeople = sortedPeople.filter(person => {
        return centuries.includes((Math.ceil(person.born / 100)).toString());
      });
    }

    return sortedPeople;
  }, [people, query, centuries, sex]);

  const noErrors = !loadingError && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && !loadingError && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {loadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && noErrors && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && noErrors && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!visiblePeople.length && noErrors && (
                <PeopleTable
                  people={people}
                  visiblePeople={visiblePeople}
                  slug={slug}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
