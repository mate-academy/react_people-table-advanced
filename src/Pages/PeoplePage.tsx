/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleContex } from '../store/PeopleContex';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const {
    people,
    errorMassage,
    loading,
    setLoading,
    setPeople,
    setErrorMassage,
  } = useContext(PeopleContex);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const filteredPeople = people?.filter(person =>
    person.name.toLowerCase().includes(query.toLowerCase()),
  );

  const isFiltered = !filteredPeople?.length && !loading;
  const isPeopleList = people && !!people.length && !loading;
  const noPeopleMessage = (!people?.length && !loading) || isFiltered;
  const isErrorMassage = errorMassage && !loading;
  const isLoading = loading && !query && !!people?.length;

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(response => {
        setPeople(response);
      })
      .catch(() => {
        setErrorMassage(true);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                isPeopleList && (
                  <table
                    data-cy="peopleTable"
                    className="table is-striped
              is-hoverable is-narrow is-fullwidth"
                  >
                    <thead>
                      <tr>
                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Name
                            <a href="#/people?sort=name">
                              <span className="icon">
                                <i className="fas fa-sort" />
                              </span>
                            </a>
                          </span>
                        </th>

                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Sex
                            <a href="#/people?sort=sex">
                              <span className="icon">
                                <i className="fas fa-sort" />
                              </span>
                            </a>
                          </span>
                        </th>

                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Born
                            <a href="#/people?sort=born&amp;order=desc">
                              <span className="icon">
                                <i className="fas fa-sort-up" />
                              </span>
                            </a>
                          </span>
                        </th>

                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Died
                            <a href="#/people?sort=died">
                              <span className="icon">
                                <i className="fas fa-sort" />
                              </span>
                            </a>
                          </span>
                        </th>

                        <th>Mother</th>
                        <th>Father</th>
                      </tr>
                    </thead>

                    <PeopleTable people={filteredPeople || people} />
                  </table>
                )
              )}

              {noPeopleMessage && (
                <p data-cy="noPeopleMessage" className="has-text-danger">
                  There are now people
                </p>
              )}

              {isErrorMassage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
