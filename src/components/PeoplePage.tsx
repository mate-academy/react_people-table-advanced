import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { PersonSex } from '../types/PersonSex';
import { getSearchWith } from '../utils/searchHelper';
import { filterPeople } from '../utils/filterPeople';
import { sortPeople } from '../utils/sortPeople';

type Props = {
  people: Person[]
  isLoading: boolean,
  isError: boolean,
};

export const PeoplePage: React.FC<Props> = ({ people, isLoading, isError }) => {
  const { personSlug = '' } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') as PersonSex || PersonSex.All;
  const centuries = searchParams.getAll('centuries') || [];

  const sort = searchParams.get('sort') ?? '';
  const order = searchParams.get('order') || '';

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const filteredPeople = filterPeople(people, query, sex, centuries);
  const sortedPeople = sortPeople(filteredPeople, sort, order);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && (
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
                onQueryChange={onQueryChange}
                searchParams={searchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!people.length && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && (
                <PeopleTable
                  people={sortedPeople}
                  sort={sort}
                  order={order}
                  selectedPerson={personSlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
