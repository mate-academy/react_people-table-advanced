import { nanoid } from 'nanoid';
import { Loader } from './Loader';

import { usePeoplePageContext } from '../context/PeoplePageContext';
import { PeopleFilters } from './PeopleFilters';
import { OnePerson } from './OnePerson';
import { TableHeaders } from './TableHeaders';
import { PageTitle } from '../../../common/PageTitle';
import { useGetDisplayPeople } from './useGetDisplayPeople';

export const PeoplePageContent = () => {
  const {
    people,
    error,
    isLoading,
  }
    = usePeoplePageContext();

  const visiblePeople
    = useGetDisplayPeople(people);

  return (
    <div data-cy="app">

      <main className="section">
        <div className="container">
          <PageTitle title="People Page" />

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

                  {error
                    && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>

                    )}

                  {!isLoading
                    && !error
                    && (!people.length)
                    && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}
                  {!isLoading
                    && !visiblePeople.length
                    && !!people.length
                    && (
                      <p data-cy="noMatchingPeopleMessage">
                        There are no people matching the current search criteria
                      </p>
                    )}

                  {!!people.length
                    && !!visiblePeople.length
                    && (
                      <table
                        data-cy="peopleTable"
                        className="table is-striped
                  is-hoverable is-narrow is-fullwidth"
                      >
                        <TableHeaders />
                        <tbody>
                          {visiblePeople.map(person => (
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
