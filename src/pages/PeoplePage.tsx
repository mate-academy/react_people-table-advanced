import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useSearchParams } from 'react-router-dom';

function peopleFilteringAndSorting(
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
) {
  let list = [...people];

  switch (sex) {
    case 'm':
      list = list.filter(person => person.sex === 'm');
      break;

    case 'f':
      list = list.filter(person => person.sex === 'f');
      break;

    default:
      break;
  }

  if (query) {
    list = list.filter(person => {
      const filteringFields = [
        person.name,
        person.fatherName,
        person.motherName,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const normalozedQuery = query.toLowerCase();

      return filteringFields.includes(normalozedQuery);
    });
  }

  if (centuries.length > 0) {
    list = list.filter(person => {
      const preparedYear = Number(person.born.toString().slice(0, 2)) + 1;

      return centuries.some(century => preparedYear.toString() === century);
    });
  }

  if (sort) {
    const direction = order === 'desc' ? -1 : 1;

    switch (sort) {
      case 'name':
      case 'sex': {
        list = [...list].sort(
          (a, b) => a[sort].localeCompare(b[sort]) * direction,
        );
        break;
      }

      case 'born':
      case 'died': {
        list = [...list].sort((a, b) => (a[sort] - b[sort]) * direction);
        break;
      }

      default:
        break;
    }
  }

  return list;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setLoading(true);
    setErrorMessage(false);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(
    () =>
      peopleFilteringAndSorting(
        people,
        sex ?? '',
        query,
        centuries,
        sort ?? '',
        order ?? '',
      ),
    [people, sex, query, centuries, sort, order],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && visiblePeople.length === 0 && people.length > 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !errorMessage && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
