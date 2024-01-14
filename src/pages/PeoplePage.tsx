import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { SortedFields } from '../types/SortedFields';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      const queryNormalize = query.trim().toLowerCase();

      result = result.filter((person) => {
        return (
          person.name.toLowerCase().includes(queryNormalize)
        || person.motherName?.toLowerCase().includes(queryNormalize)
        || person.fatherName?.toLowerCase().includes(queryNormalize));
      });
    }

    if (centuries.length) {
      result = result.filter((person) => {
        return (
          centuries.includes(Math.ceil(person.born / 100).toString())
        );
      });
    }

    if (sort) {
      result = result.sort((a, b) => {
        switch (sort) {
          case SortedFields.Name:
            return a.name.localeCompare(b.name);
          case SortedFields.Sex:
            return a.sex.localeCompare(b.sex);
          case SortedFields.Born:
            return a.born - b.born;
          case SortedFields.Died:
            return a.died - b.died;
          default:
            return 0;
        }
      });

      if (order === 'desc') {
        result.reverse();
      }
    }

    return result;
  }, [people, sex, query, centuries, sort, order]);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && (
                <Loader />
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !!people?.length && !!filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
