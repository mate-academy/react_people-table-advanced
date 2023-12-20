import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
// import { URLSearchParams } from 'url';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PeopleTable';
import { SearchLink } from './SearchLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const peopleMain = useRef<Person[]>(people);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getPeople();

        setPeople(data);
        peopleMain.current = data;
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const filteredPeople = useMemo(() => {
    let peoples = people;

    if (sex) {
      peoples = peoples.filter(person => person.sex === sex);
    }

    if (centuries) { // Проблема з цим
      peoples = peoples.filter(person => centuries
        .includes((parseInt(person.born
          .toString().slice(0, 2), 10) + 1).toString()));
    }

    if (query) {
      peoples = peoples.filter(person => person.name.toLowerCase()
        .includes(query.toLowerCase()));
    }

    return peoples;
  }, [query, people, sex, centuries]);

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
              {
                isLoading
                  ? <Loader />
                  : (
                    <>
                      {isError && (
                        <p
                          data-cy="peopleLoadingError"
                          className="has-text-danger"
                        >
                          Something went wrong
                        </p>
                      )}
                      {!people.length ? (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      ) : (
                        <table
                          data-cy="peopleTable"
                          className="
                          table
                          is-striped
                          is-hoverable
                          is-narrow
                          is-fullwidth
                          "
                        >
                          <thead>
                            <tr>
                              <th>
                                <span className="is-flex is-flex-wrap-nowrap">
                                  Name
                                  {(() => { // Замінити на функцію
                                    const sort = searchParams.get('sort');
                                    const order = searchParams.get('order');

                                    switch (sort) {
                                      case 'name':
                                        if (order !== 'desc') {
                                          return (
                                            <SearchLink params={{
                                              order: 'desc',
                                            }}
                                            >
                                              <span className="icon">
                                                <i className="fas fa-sort-up" />
                                              </span>
                                            </SearchLink>
                                          );
                                        }

                                        return (
                                          <SearchLink params={{
                                            sort: null,
                                            order: null,
                                          }}
                                          >
                                            <span className="icon">
                                              <i className="fas fa-sort-down" />
                                            </span>
                                          </SearchLink>
                                        );

                                      default:
                                        return (
                                          <SearchLink params={{ sort: 'name' }}>
                                            <span className="icon">
                                              <i className="fas fa-sort" />
                                            </span>
                                          </SearchLink>
                                        );
                                    }
                                  })()}
                                </span>
                              </th>

                              <th>
                                <span className="is-flex is-flex-wrap-nowrap">
                                  Sex
                                  <Link to="#/people?sort=sex">
                                    <span className="icon">
                                      <i className="fas fa-sort" />
                                    </span>
                                  </Link>
                                </span>
                              </th>

                              <th>
                                <span className="is-flex is-flex-wrap-nowrap">
                                  Born
                                  <Link to="#/people?sort=born&amp;order=desc">
                                    <span className="icon">
                                      <i className="fas fa-sort" />
                                      {/* fa-sort-up fa-sort-down */}
                                    </span>
                                  </Link>
                                </span>
                              </th>

                              <th>
                                <span className="is-flex is-flex-wrap-nowrap">
                                  Died
                                  <Link to="#/people?sort=died">
                                    <span className="icon">
                                      <i className="fas fa-sort" />
                                    </span>
                                  </Link>
                                </span>
                              </th>

                              <th>Mother</th>
                              <th>Father</th>
                            </tr>
                          </thead>

                          <tbody>
                            {
                              filteredPeople.map(person => (
                                <PersonLink
                                  key={person.slug}
                                  person={person}
                                  people={people}
                                />
                              ))
                            }
                          </tbody>
                        </table>
                      )}
                    </>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// {/* <th>
// <span className="is-flex is-flex-wrap-nowrap">
//   Name
//   {(() => {
//     switch (searchParams.get('sort') === 'name') {
//       case 'name': // #/people?sort=name
//         return (
//           <SearchLink
//             params={{ order: 'desc' }}
//           >
//             <span
//               className="icon"
//             >
//               <i className="fa-sort-up" />
//             </span>
//           </SearchLink>
//         );
//       case '#/people?sort=name&order=desc':
//         return (
//           <SearchLink params={{
//             name: null,
//             order: null,
//           }}
//           >
//             <span className="icon">
//               <i className="fa-sort-down" />
//             </span>
//           </SearchLink>
//         );
//       default:
//         return (
//           <SearchLink params={{ sort: 'name' }}>
//             <span className="icon">
//               <i className="fas fa-sort" />
//             </span>
//           </SearchLink>
//         );
//     }
//   })()}
// </span>
// </th> */}
