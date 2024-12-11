import 'bulma/css/bulma.css';
import { Loader } from '../components/Loader';
import { usePeople } from '../hooks/usePeople';
import PeopleTable from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getCenturiesFromUrl, getCenturiesList } from '../utils/services';
import { useSearchParams } from 'react-router-dom';

const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { people, isPeopleLoading, isPeopleError } = usePeople();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const centuries = getCenturiesFromUrl(searchParams);

  const centuriesList = getCenturiesList(people);

  let status = 'loading';

  if (isPeopleError) {
    status = 'error';
  } else if (!isPeopleLoading && people.length > 0) {
    status = 'loaded';
  } else if (!isPeopleLoading && people.length === 0) {
    status = 'empty';
  }

  const hanldeCenturiesChange = (century: number): void => {
    const params = new URLSearchParams(searchParams);

    const newCent = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    if (newCent.length === 0) {
      params.delete('centuries'); // Clear the parameter entirely if empty
    } else {
      params.set('centuries', newCent.toSorted().join('-'));
    }

    params.sort();

    setSearchParams(params);
  };

  const handleQueryChange = (queryValue: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', queryValue);

    if (!queryValue) {
      params.delete('query');
    }

    params.sort();

    setSearchParams(params);
  };

  const handleSexChange = (sexValue: '' | 'm' | 'f') => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', sexValue);

    if (sexValue === '') {
      params.delete('sex');
    }

    params.sort();

    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchParams({ query: '' });
    setSearchParams({ sex: '' });
    setSearchParams({ centuries: [] });
  };

  const handleCenturiesReset = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  };

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
                handleSexChange={handleSexChange}
                centuriesList={centuriesList}
                centuries={centuries}
                hanldeCenturiesChange={hanldeCenturiesChange}
                handleCenturiesReset={handleCenturiesReset}
                resetFilters={resetFilters}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {status === 'loading' && <Loader />}

              {status === 'error' && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {status === 'loaded' && (
                <PeopleTable
                  people={people}
                  query={query}
                  sex={sex}
                  centuries={centuries}
                />
              )}

              {status === 'empty' && (
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
