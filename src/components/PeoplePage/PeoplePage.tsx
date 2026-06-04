import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Errors } from '../../Errors';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';

export const PeoplePage = () => {
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsPeopleLoading(true);
    setPeopleLoadingError('');

    getPeople()
      .then(data => {
        setPeople(data);

        if (data.length === 0) {
          setPeopleLoadingError(Errors.NoPeopleMessage);
        }
      })
      .catch(() => setPeopleLoadingError(Errors.PeopleLoadingError))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  const filteredAndSortedPeople = useMemo(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (query) {
      const lowerQuery = query.toLowerCase();

      result = result.filter(
        p =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.motherName?.toLowerCase().includes(lowerQuery) ||
          p.fatherName?.toLowerCase().includes(lowerQuery),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(p =>
        centuries.includes(String(Math.ceil(p.born / 100))),
      );
    }

    if (sort) {
      result.sort((a, b) => {
        let comparison = 0;

        switch (sort) {
          case 'name':
          case 'sex':
            comparison = a[sort].localeCompare(b[sort]);
            break;
          case 'born':
          case 'died':
            comparison =
              a[sort as 'born' | 'died'] - b[sort as 'born' | 'died'];
            break;
        }

        return order === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [people, query, sex, centuries, sort, order]);

  const peopleLoaded =
    !isPeopleLoading && !peopleLoadingError && people.length > 0;
  const hasNoMatches = peopleLoaded && filteredAndSortedPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isPeopleLoading && <Loader />}

              {peopleLoadingError === Errors.PeopleLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {peopleLoadingError}
                </p>
              )}

              {peopleLoadingError === Errors.NoPeopleMessage && (
                <p data-cy="noPeopleMessage" className="has-text-info">
                  {peopleLoadingError}
                </p>
              )}

              {hasNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {peopleLoaded && filteredAndSortedPeople.length > 0 && (
                <PeopleTable people={filteredAndSortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
