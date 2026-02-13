import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import PeopleContent from './PeopleContent';
import { usePeople } from '../../hooks/usePeople';

const PeoplePage = () => {
  const { people, isLoading, hasError } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleContent
                hasError={hasError}
                isLoading={isLoading}
                people={people}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
