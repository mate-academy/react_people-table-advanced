import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { usePeople } from '../utils/usePeople';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { peopleData, isLoading, error } = usePeople();
  const [searchParams] = useSearchParams();

  // dados que a tabela espera
  const people = peopleData ?? [];
  const sort = searchParams.get('sort') ?? '';
  const order = (searchParams.get('order') as string | null) ?? null;

  // considere como “filtrado” quando há qualquer filtro diferente de sort/order
  const filterKeys = ['query', 'sex', 'bornFrom', 'bornTo']; // ajuste aos nomes usados no seu PeopleFilters
  const isFiltered = filterKeys.some(k => searchParams.get(k));

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

              {!isLoading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && people.length === 0 && !isFiltered && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !error && people.length === 0 && isFiltered && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && people.length > 0 && (
                <PeopleTable
                  people={people}
                  isLoading={isLoading}
                  error={Boolean(error)}
                  isFiltered={isFiltered}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
