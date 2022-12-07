import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [isErrorShowing, setIsErrorShowing] = useState(false);

  const [people, setPeople] = useState<Person[] | null>(null);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function hasQuery(el: string | null) {
    if (el) {
      return el.toLowerCase().includes(query.toLowerCase());
    }

    return false;
  }

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

  const filteredPeople = useMemo(() => {
    let peopleToSet: Person[] = visiblePeople;

    if (query) {
      peopleToSet = peopleToSet.filter(person => {
        const { name, fatherName, motherName } = person;

        return hasQuery(name) || hasQuery(fatherName) || hasQuery(motherName);
      });
    }

    if (sex) {
      peopleToSet = peopleToSet.filter(el => el.sex === sex);
    }

    if (centuries.length > 0) {
      peopleToSet = peopleToSet.filter(person => {
        const centuriesPersonLived = [
          Math.ceil(person.born / 100),
          Math.ceil(person.died / 100),
        ];

        return centuries.includes(centuriesPersonLived[0].toString())
          || centuries.includes(centuriesPersonLived[1].toString());
      });
    }

    return peopleToSet;
  }, [query, sex, centuries]);

  const arePeopleRendered = filteredPeople
  && people
  && filteredPeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

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

              {!filteredPeople.length && !isPeopleLoading
                ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
                : ''}

              {isPeopleLoading
                ? <Loader />
                : (arePeopleRendered && (
                  <PeopleTable
                    people={people}
                    filteredPeople={filteredPeople}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
