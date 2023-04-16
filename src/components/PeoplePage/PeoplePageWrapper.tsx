import { PeopleFilters } from '../PeopleFilters';
import { PeoplePageContent } from './PeoplePageContent';

export const PeoplePageWrapper: React.FC = () => (
  <>
    <h1 className="title">People Page</h1>

    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>

        <div className="column">
          <div className="box table-container">
            <PeoplePageContent />
          </div>
        </div>
      </div>
    </div>
  </>
);
