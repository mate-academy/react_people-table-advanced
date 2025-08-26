import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleLoadingError } from './PeopleLoadingError';
import { NoPeopleMessage } from './NoPeopleMessage';
import { usePersons } from './PeopleContext/PeopleContext';

export const PeoplePage = () => {
  const { people, loading, error } = usePersons();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <PeopleLoadingError />;
  }

  if (people.length === 0) {
    return <NoPeopleMessage />;
  }

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
              <PeopleTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
