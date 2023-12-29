import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { usePeoplePageContext } from './PeoplePageContext/PeoplePageContext';

export const PeoplePage: React.FC = () => {
  const { loading } = usePeoplePageContext();

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            {!loading && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )}
            <div className="column">
              <PeopleTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
