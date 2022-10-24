import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex');
  const { slug } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getPeople();

        setPeople(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const sortPeople = (person: Person) => {
    return person.name.toLowerCase().includes(query.toLowerCase())
  || person.motherName?.toLowerCase().includes(query.toLowerCase())
  || person.fatherName?.toLowerCase().includes(query.toLowerCase());
  };

  const visiblePeople = useMemo(() => {
    let sortedPeople = people;

    if (query) {
      sortedPeople = sortedPeople.filter(person => {
        return sortPeople(person);
      });
    }

    if (sex) {
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

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              { !isLoading && !isError && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people.length > 0 && !isLoading && (
                <PeopleTable
                  people={people}
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
