import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable, SortField, SortOrder } from './PeopleTable';

const SORT_FIELDS: SortField[] = ['name', 'sex', 'born', 'died'];

const getCentury = (year: number) => Math.ceil(year / 100).toString();

const comparePeople = (
  firstPerson: Person,
  secondPerson: Person,
  sortField: SortField,
) => {
  if (typeof firstPerson[sortField] === 'number') {
    return firstPerson[sortField] - secondPerson[sortField];
  }

  return String(firstPerson[sortField]).localeCompare(
    String(secondPerson[sortField]),
  );
};

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(loadedPeople => {
        if (!isCancelled) {
          setPeople(loadedPeople);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const preparedPeople = useMemo(() => {
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

  const sexParam = searchParams.get('sex');
  const sex = sexParam === 'm' || sexParam === 'f' ? sexParam : null;
  const query = searchParams.get('query')?.toLowerCase() ?? '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sort =
    sortField && SORT_FIELDS.includes(sortField as SortField)
      ? (sortField as SortField)
      : null;
  const order: SortOrder =
    searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  const visiblePeople = useMemo(() => {
    const filteredPeople = preparedPeople
      .filter(person => (sex ? person.sex === sex : true))
      .filter(person => {
        if (!query) {
          return true;
        }

        const searchableFields = [
          person.name,
          person.motherName ?? '',
          person.fatherName ?? '',
        ];

        return searchableFields.some(field =>
          field.toLowerCase().includes(query),
        );
      })
      .filter(person => {
        if (!centuries.length) {
          return true;
        }

        return centuries.includes(getCentury(person.born));
      });

    if (!sort) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((firstPerson, secondPerson) => {
      const result = comparePeople(firstPerson, secondPerson, sort);

      if (result !== 0) {
        return order === 'desc' ? -result : result;
      }

      return firstPerson.name.localeCompare(secondPerson.name);
    });
  }, [centuries, order, preparedPeople, query, sex, sort]);

  const hasPeople = people.length > 0;
  const showFilters = !isLoading && !hasError;
  const showNoMatches = showFilters && hasPeople && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {showFilters && (
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

              {!isLoading && !hasError && showNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading &&
                !hasError &&
                hasPeople &&
                visiblePeople.length > 0 && (
                  <PeopleTable people={visiblePeople} selectedSlug={slug} />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
