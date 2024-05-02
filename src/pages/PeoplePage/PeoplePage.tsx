import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { usePeople } from '../../hooks/usePeople';
import { useSearchParams } from 'react-router-dom';
import { getVisiblePeople } from '../../utils/getVisiblePeople';

export const PeoplePage = () => {
  const { people, error, isLoading } = usePeople();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const visiblePeople = getVisiblePeople(people, {
    query,
    centuries,
    sex,
    sort,
    order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && <p data-cy="peopleLoadingError">{error}</p>}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!!people.length &&
                (visiblePeople.length ? (
                  <PeopleTable visiblePeople={visiblePeople} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
