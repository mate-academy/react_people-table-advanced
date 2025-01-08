import 'bulma/css/bulma.css';
import { usePeople } from '../hooks/usePeople';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { Status } from '../types/Filter';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';
import { getCenturiesFromUrl, getCenturiesArr } from '../utils/getCenturies';

export const PeoplePage: React.FC = () => {
  const { people, error, isLoading } = usePeople();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || null;
  const sortOrder = searchParams.get('sortOrder') || null;
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';

  const centuriesArr = getCenturiesArr(people);
  const centuries = getCenturiesFromUrl(searchParams);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (queryValue: string) => {
    setSearchWith({ query: queryValue || null });
  };

  let status = Status.Loading;

  if (error) {
    status = Status.Error;
  } else if (!isLoading && people.length > 0) {
    status = Status.Loaded;
  } else if (!isLoading && people.length === 0) {
    status = Status.Empty;
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {status === 'loaded' && (
              <PeopleFilters
                query={query}
                handleQueryChange={handleQueryChange}
                sex={sex}
                centuriesArr={centuriesArr}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {status === Status.Loading && <Loader />}

              {status === Status.Error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {status === Status.Loaded && (
                <PeopleTable
                  people={people}
                  query={query}
                  sex={sex}
                  centuries={centuries.map(Number)}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              )}

              {status === Status.Empty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
