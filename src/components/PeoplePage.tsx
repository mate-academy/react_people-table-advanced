import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [visiblePeople, setVisiblePeople] = useState<Person[] | null>(null);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [isErrorShowing, setIsErrorShowing] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // const centuries = searchParams.getAll('centuries') || [];
  // const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const arePeopleRendered = visiblePeople && people && visiblePeople.length > 0;

  function hasQuery(el: string | null) {
    if (el) {
      return el.toLowerCase().includes(query.toLowerCase());
    }

    return false;
  }

  useEffect(() => {
    if (people) {
      setVisiblePeople(people.filter(person => {
        const { name, fatherName, motherName } = person;

        return hasQuery(name) || hasQuery(fatherName) || hasQuery(motherName);
      }));
    }
  }, [query]);

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
        setVisiblePeople(data);
        setIsPeopleLoading(false);
      })
      .catch(() => {
        setIsErrorShowing(true);
        setIsPeopleLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <h1 className="has-text-info">
        {location.pathname}
      </h1>
      <h1 className="has-text-danger">
        {location.search}
      </h1>
      <br />
      <br />

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isPeopleLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isErrorShowing && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(!people && !isPeopleLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople?.length === 0
                ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
                : ''}

              {isPeopleLoading
                ? <Loader />
                : (arePeopleRendered && (
                  <PeopleTable people={people} visiblePeople={visiblePeople} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
