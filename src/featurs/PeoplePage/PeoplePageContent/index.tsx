import { nanoid } from 'nanoid';
import { Loader } from './Loader';
import {
  usePeoplePageContext,
} from '../../../context/PeoplePageContext';
import { PeopleFilters } from './PeopleFilters';
import { OnePerson } from './OnePerson';
import { TableHeader } from './TableHeader';

export const PeoplePageContent = () => {
  const {
    people,
    error,
    isLoading,
  }
    = usePeoplePageContext();

  return (
    <div data-cy="app">

      <main className="section">
        <div className="container">
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              {!isLoading
              && (
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters />
                </div>
              )}
              <div className="column">

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
                    //              <p>There are no people matching the current search criteria</p>
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
                        />
                      ))}
                    </tbody>
                  </table>
                )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
