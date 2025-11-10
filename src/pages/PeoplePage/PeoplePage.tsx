import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { usePeople } from '../../hooks';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { Order, Person, Sex } from '../../types';
import { getSortedPeople } from '../../utils/getSortedPeople';

const PeoplePage = () => {
  /* The reason I decided to create a custom hook is
  because this is my first time doing so. I’ve never created any
  before, so I’m excited to practice it. */
  const { people, isLoading, error } = usePeople();
  const noPeople = people.length === 0;

  const [searchParams] = useSearchParams();

  let preparedPeople = getFilteredPeople(people, {
    sex: (searchParams.get('sex') as Sex) || null,
    query: searchParams.get('query') || null,
    centuries: searchParams.getAll('centuries').map(Number),
  });

  preparedPeople = getSortedPeople(preparedPeople, {
    field: (searchParams.get('sort') as keyof Person) || null,
    order: (searchParams.get('order') as Order) || Order.None,
  });

  const hasMatches = preparedPeople.length > 0;

  const showFilters = !isLoading && !error;
  const showTable = !isLoading && !error && !noPeople && hasMatches;

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

              {error && <p data-cy="peopleLoadingError">{error}</p>}

              {!isLoading && noPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !noPeople && !hasMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && <PeopleTable people={preparedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
