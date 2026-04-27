import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

type PeoplePageStatus =
  | 'success'
  | 'error'
  | 'loading'
  | 'areNoPeople'
  | 'idle';

export const PeoplePage = () => {
  const [pageStatus, setPageStatus] = useState<PeoplePageStatus>('idle');
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const searchCenturies = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const searchQuery = searchParams.get('query') || '';
  const searchSex = searchParams.get('sex') || '';

  const searchSort = searchParams.get('sort') || '';
  const searchOrder = searchParams.get('order') || '';

  const filteredPeople = useMemo(
    () =>
      people.filter(person => {
        const century = String(Math.ceil(person.born / 100));

        if (searchCenturies.length > 0 && !searchCenturies.includes(century)) {
          return false;
        }

        if (searchSex && searchSex !== person.sex) {
          return false;
        }

        const normalizedQuery = searchQuery.trim().toLowerCase();

        if (
          person.name.toLowerCase().includes(normalizedQuery) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(normalizedQuery)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(normalizedQuery))
        ) {
          return true;
        }

        return false;
      }),
    [people, searchCenturies, searchQuery, searchSex],
  );

  const sortedPeople = useMemo(() => {
    if (!searchSort) {
      return filteredPeople;
    }

    switch (searchSort) {
      case 'name':
        return [...filteredPeople].sort((personA, personB) => {
          return searchOrder
            ? personB.name.localeCompare(personA.name)
            : personA.name.localeCompare(personB.name);
        });
      case 'sex':
        return [...filteredPeople].sort((personA, personB) => {
          return searchOrder
            ? personB.sex.localeCompare(personA.sex)
            : personA.sex.localeCompare(personB.sex);
        });
      case 'born':
        return [...filteredPeople].sort((personA, personB) => {
          return searchOrder
            ? personB.born - personA.born
            : personA.born - personB.born;
        });
      case 'died':
        return [...filteredPeople].sort((personA, personB) => {
          return searchOrder
            ? personB.died - personA.died
            : personA.died - personB.died;
        });
      default:
        return filteredPeople;
    }
  }, [filteredPeople, searchOrder, searchSort]);

  useEffect(() => {
    setPageStatus('loading');

    getPeople()
      .then(fetchData => {
        setPeople(fetchData);
        if (fetchData.length === 0) {
          setPageStatus('areNoPeople');

          return;
        }

        setPageStatus('success');
      })
      .catch(() => {
        setPageStatus('error');
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {pageStatus === 'success' && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">
              {pageStatus === 'loading' && <Loader />}

              {pageStatus === 'error' && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {pageStatus === 'areNoPeople' && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {pageStatus === 'success' && (
                <PeopleTable filteredPeople={sortedPeople} people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
