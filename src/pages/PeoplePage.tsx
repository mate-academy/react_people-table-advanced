import 'bulma/css/bulma.css';
import { Loader } from '../components/Loader';
import { usePeople } from '../hooks/usePeople';
import PeopleTable from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

const PeoplePage = () => {
  const { people, isPeopleLoading, isPeopleError } = usePeople();

  let status = 'loading';

  if (isPeopleError) {
    status = 'error';
  } else if (!isPeopleLoading && people.length > 0) {
    status = 'loaded';
  } else if (!isPeopleLoading && people.length === 0) {
    status = 'empty';
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {status === 'loaded' && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {status === 'loading' && <Loader />}

              {status === 'error' && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {status === 'loaded' && <PeopleTable people={people} />}

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
