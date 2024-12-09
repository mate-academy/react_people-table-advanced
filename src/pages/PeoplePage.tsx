import 'bulma/css/bulma.css';
import { Loader } from '../components/Loader';
import { usePeople } from '../hooks/usePeople';
import PeopleTable from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useState } from 'react';
import { getCenturiesList } from '../utils/services';
// import { useLocation } from 'react-router-dom';

const PeoplePage = () => {
  const { people, isPeopleLoading, isPeopleError } = usePeople();
  const [query, setQuery] = useState('');
  const [sex, setSex] = useState<'all' | 'm' | 'f'>('all');
  const [centuries, setCenturies] = useState<string[]>([]);

  const centuriesList = getCenturiesList(people);

  // const { pathname, search } = useLocation();

  // console.log('pathName:', pathname);
  // console.log('search:', search);

  let status = 'loading';

  if (isPeopleError) {
    status = 'error';
  } else if (!isPeopleLoading && people.length > 0) {
    status = 'loaded';
  } else if (!isPeopleLoading && people.length === 0) {
    status = 'empty';
  }

  const hanldeCenturiesChange = (century: string) => {
    setCenturies(currentCenturies =>
      currentCenturies.includes(century)
        ? currentCenturies.filter(c => c !== century)
        : [...currentCenturies, century],
    );
  };

  const handleCenturiesReset = () => {
    setCenturies([]);
  };

  const handleQueryChange = (queryValue: string) => {
    setQuery(queryValue);
  };

  const handleSexChange = (sexValue: 'all' | 'm' | 'f') => {
    setSex(sexValue);
  };

  const resetFilters = () => {
    setQuery('');
    setSex('all');
    setCenturies([]);
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
