// import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleList } from './PeopleList';

export const PeoplePage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const sort = searchParams.get('sort');
  // const centuries = searchParams.get('centuries');
  // const sex = searchParams.get('sex');
  // const query = searchParams.get('query');

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <PeopleList />
          </div>
        </div>
      </div>
    </>
  );
};
