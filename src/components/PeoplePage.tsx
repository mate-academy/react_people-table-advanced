import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = (searchParams.getAll('centuries') || []);
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  let visiblePeople = people;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useMemo(() => {
    if (query) {
      visiblePeople = visiblePeople.filter(body => body.name
        .toLowerCase()
        .includes(query.toLowerCase())
        || body.fatherName?.toLowerCase().includes(query.toLowerCase())
        || body.motherName?.toLowerCase().includes(query.toLowerCase()));
    }

    if (centuries.length) {
      visiblePeople = visiblePeople.filter(body => centuries
        .includes(Math.ceil(body.born / 100).toString())
        || centuries.includes((Math.ceil(body.died / 100)).toString()));
    }

    if (sex) {
      visiblePeople = visiblePeople.filter(body => body.sex === sex);
    }

    if (sort) {
      visiblePeople = [...visiblePeople].sort((a, b) => {
        if (sort === a.name || sort === a.sex) {
          return a.name.localeCompare(b.name) || a.sex.localeCompare(b.sex);
        }

        return a.died - b.died || a.born - b.born;
      });
    }

    if (order) {
      visiblePeople = visiblePeople.reverse();
    }
  }, [query, centuries.length, sex, sort, order]);

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
              {isLoading && (<Loader />)}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!people.length && !isLoading && !isError) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!visiblePeople.length && !isLoading && !isError) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!visiblePeople.length && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
