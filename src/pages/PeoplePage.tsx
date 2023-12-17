import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTab } from '../components/PeopleTab';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [loader, setLoader] = useState(false);
  const [errorMеssage, setErrorMеssage] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const visiblePeople = useMemo(() => {
    let fpeople = [...people];

    if (sex) {
      fpeople = fpeople.filter(person => person.sex === sex);
    }

    if (query) {
      fpeople = fpeople.filter(
        (person) => person.name
          .toLowerCase()
          .includes(query.toLocaleLowerCase())
          || (person.motherName || '')
            .toLowerCase()
            .includes(query.toLocaleLowerCase())
          || (person.fatherName || '')
            .toLowerCase()
            .includes(query.toLocaleLowerCase()),
      );
    }

    if (centuries.length > 0) {
      fpeople = fpeople.filter(person => (
        centuries.includes((Math.floor(person.born / 100) + 1).toString())
      ));
    }

    if (sort) {
      fpeople = fpeople.sort((a, b) => {
        switch (sort) {
          case 'sex':
          case 'name':
            return a[sort].localeCompare(b[sort]);

          case 'born':
          case 'died':
            return a[sort] - b[sort];

          default: return 0;
        }
      });

      if (order) {
        fpeople = fpeople.reverse();
      }
    }

    return fpeople;
  }, [sex, people, query, centuries, sort, order]);

  useEffect(() => {
    setLoader(true);

    getPeople()
      .then((serverPeople) => {
        setPeople(serverPeople);
      })
      .catch(() => {
        setErrorMеssage(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

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
              {loader && <Loader />}

              {!loader
                && (errorMеssage ? (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                ) : (
                  !!people.length && (
                    <PeopleTab people={people} filteredPeople={visiblePeople} />
                  )
                ))}

              {(!people.length && !loader) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
