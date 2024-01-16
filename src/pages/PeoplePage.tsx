import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person, SortType } from '../types';
import { getPeople } from '../api';
import { getPeopleWithParrents } from '../helpers';
import { Loader, PeopleFilters, PeopleList } from '../components';

export const PeoplePage = () => {
  const [loadingPeople, setLoadingPeople] = useState<boolean>(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [errors, setErrors] = useState<string>('');

  useEffect(() => {
    getPeople()
      .then(data => setPeople(getPeopleWithParrents(data)))
      .catch(() => setErrors('Something went wrong'))
      .finally(() => setLoadingPeople(false));
  }, []);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const visiblePeople = useMemo(() => {
    const centuries = searchParams.getAll('centuries') || [];
    let result = [...people];

    if (sex) {
      result = result.filter((person) => person.sex === sex);
    }

    if (query) {
      result = result.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
          || person.motherName?.toLowerCase().includes(query.toLowerCase())
          || person.fatherName?.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (centuries.length) {
      result = result.filter(person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ));
    }

    if (sort) {
      result.sort((a, b) => {
        switch (sort) {
          case SortType.NAME:
          case SortType.SEX:
            return a[sort].localeCompare(b[sort]);
          case SortType.BORN:
          case SortType.DIED:
            return a[sort] - b[sort];
          default:
            return 0;
        }
      });
    }

    if (order) {
      return result.reverse();
    }

    return result;
  }, [sex, query, sort, order, people, searchParams]);

  const renderContent = () => {
    if (loadingPeople) {
      return (
        <>
          <div className="column">
            <div className="box table-container">
              <Loader />
            </div>
          </div>
        </>
      );
    }

    if (!loadingPeople && errors) {
      return (
        <>
          <div className="column">
            <div className="box table-container">
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errors}
              </p>
            </div>
          </div>
        </>
      );
    }

    if (!loadingPeople && people.length === 0) {
      return (
        <>
          <div className="column">
            <div className="box table-container">
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>
        <div className="column">
          <div className="box table-container">
            <PeopleList people={visiblePeople} />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {renderContent()}
        </div>
      </div>
    </>
  );
};
