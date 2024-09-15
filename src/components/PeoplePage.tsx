import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { useSearchParams } from 'react-router-dom';
import { useFetchPeople } from '../utils/useFetchPeople';
import { SearchParams, Order, SortField } from '../utils/constants';

export const PeoplePage = () => {
  const { people, isLoading, errorMessage } = useFetchPeople();
  const [searchParams] = useSearchParams();

  const sex = searchParams.get(SearchParams.SEX);
  const query = searchParams.get(SearchParams.QUERY);
  const years = searchParams.getAll(SearchParams.YEARS);
  const sortField = searchParams.get(SearchParams.SORT);
  const isReversed = searchParams.get(SearchParams.ORDER) === Order.DESC;

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalQuery = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      return [person.name, person.motherName || '', person.fatherName || '']
        .join('\n')
        .toLocaleLowerCase()
        .includes(normalQuery);
    });
  }

  if (years.length > 0) {
    visiblePeople = visiblePeople.filter(person =>
      years.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sortField) {
    visiblePeople.sort((a, b) => {
      switch (sortField) {
        case SortField.NAME:
        case SortField.SEX:
          return a[sortField].localeCompare(b[sortField]);

        case SortField.BORN:
        case SortField.DIED:
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });

    if (isReversed) {
      visiblePeople.reverse();
    }
  }

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
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                ''
              )}

              {!isLoading && errorMessage === '' && (
                <PeopleTable
                  people={visiblePeople}
                  peopleFromServer={[...people]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
