import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../hooks/usePeople';
import { useFilters } from '../hooks/useFilters';

export const PeoplePage = () => {
  const { people, error, isLoading } = usePeople();
  const { filteredPeople } = useFilters(people);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p data-cy="peopleLoadingError">Something went wrong</p>;
  }

  if (people && people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people && <PeopleFilters people={people} />}
          </div>
          <div className="column">
            <div className="box table-container">
              <PeopleTable people={people} />
              {filteredPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
