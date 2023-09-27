import { nanoid } from 'nanoid';
import { Loader } from './Loader';
import { usePeople } from './usePeople';
import { OnePerson } from './OnePerson';
import { PeopleFilters } from '../../components/PeopleFilters';
import { TableHeader } from './TableHeader';

export const PeoplePage = () => {
  const {
    people,
    error,
    isLoading,
    getParentSlug,
  }
    = usePeople();

  return (
    <div data-cy="app">

      <main className="section">
        <div className="container">
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
              <div className="box table-container">
                {isLoading && (
                  <Loader />
                )}

                {error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!isLoading && (people.length < 1) && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                { people.length > 0
                && (
                  <table
                    data-cy="peopleTable"
                    className="table is-striped
                  is-hoverable is-narrow is-fullwidth"
                  >
                    <TableHeader />
                    <tbody>
                      {people.map(person => (
                        <OnePerson
                          key={nanoid()}
                          person={person}
                          getParentSlug={getParentSlug}
                        />
                      ))}
                    </tbody>
                  </table>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
};
