import 'bulma/css/bulma.css';
import { Loader } from '../components/Loader';
import { usePeople } from '../hooks/usePeople';
import PeopleTable from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getCenturiesFromUrl, getCenturiesList } from '../utils/services';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { Status } from '../types';

const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { people, isPeopleLoading, isPeopleError } = usePeople();
  const sortBy = searchParams.get('sortBy') || null;
  const sortOrder = searchParams.get('sortOrder') || null;
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const centuries = getCenturiesFromUrl(searchParams);
  const centuriesList = getCenturiesList(people);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (queryValue: string) => {
    setSearchWith({ query: queryValue || null });
  };

  let status = Status.Loading;

  if (isPeopleError) {
    status = Status.Error;
  } else if (!isPeopleLoading && people.length > 0) {
    status = Status.Loaded;
  } else if (!isPeopleLoading && people.length === 0) {
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
                centuriesList={centuriesList}
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

export default PeoplePage;
