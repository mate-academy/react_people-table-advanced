import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type SortField = 'name' | 'sex' | 'born' | 'died';

const isSortField = (value: string | null): value is SortField => {
  return ['name', 'sex', 'born', 'died'].includes(value || '');
};

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = useMemo(() => {
    const peopleByName = new Map(people.map(person => [person.name, person]));

    return people.map(person => ({
      ...person,
      mother: person.motherName
        ? peopleByName.get(person.motherName)
        : undefined,
      father: person.fatherName
        ? peopleByName.get(person.fatherName)
        : undefined,
    }));
  }, [people]);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    return peopleWithParents
      .filter(person => !sex || person.sex === sex)
      .filter(person => {
        if (!query) {
          return true;
        }

        const haystack = [person.name, person.motherName, person.fatherName]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return haystack.includes(query);
      })
      .filter(person => {
        if (!centuries.length) {
          return true;
        }

        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
  }, [peopleWithParents, sex, query, centuries]);

  const visiblePeople = useMemo(() => {
    if (!isSortField(sort)) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople];
    const direction = order === 'desc' ? -1 : 1;

    sorted.sort((a, b) => {
      if (sort === 'born' || sort === 'died') {
        return (a[sort] - b[sort]) * direction;
      }

      return a[sort].localeCompare(b[sort]) * direction;
    });

    return sorted;
  }, [filteredPeople, sort, order]);

  const hasPeople = people.length > 0;
  const showTable = hasPeople && visiblePeople.length > 0;
  const showNoMatches =
    !isLoading && !hasError && hasPeople && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && !hasPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && (
                <PeopleTable people={visiblePeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
