import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop"></div>
          <div className="column">
            <PeopleTable />
          </div>
        </div>
      </div>
    </>
  );
};
