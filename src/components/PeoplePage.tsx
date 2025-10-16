import { useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import peopleData from '../components/api/people.json';

export const PeoplePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const people = peopleData;

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
              <Loader />
              <p data-cy="peopleLoadingError">Something went wrong</p>
              <p data-cy="noPeopleMessage">There are no people on the server</p>
              <p>There are no people matching the current search criteria</p>

              <PeopleTable people={people} selectedPersonSlug={slug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
