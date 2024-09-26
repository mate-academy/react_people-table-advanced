import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../store/PeopleContext';

export const PeoplePage = () => {
  const { people, isLoading } = usePeople();

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              <PeopleTable people={people} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
