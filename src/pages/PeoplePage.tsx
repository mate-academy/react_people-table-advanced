import { useParams } from 'react-router-dom';
import { PeopleFilters } from '../components/Search/PeopleFilters';
import { PersonTable } from '../components/PersonTable';

export const PeoplePage = () => {
  const { personSlug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <PersonTable selectedPerson={personSlug} />
        </div>
      </div>
    </>
  );
};
