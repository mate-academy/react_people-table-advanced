import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Error } from '../components/Error';
import { Person } from '../types/Person';

type Props = {
  people: Person[],
  error: string,
};

export const PeoplePage: React.FC<Props> = ({ people, error }) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <Error error={error} />
      <div className="columns is-desktop is-flex-direction-row-reverse">
        {people.length === 0
          ? <Loader />
          : (
            <>
              <PeopleFilters />

              <div className="column is-7-tablet is-narrow-desktop">
                <div className="column">
                  <div className="box table-container">

                    <PeopleTable
                      people={people}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
    </>
  );
};
