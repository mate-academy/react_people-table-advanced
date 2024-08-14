import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  setShowFilters: (arg: boolean) => void;
};

export const PeopleTable: React.FC<Props> = ({ setShowFilters }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const handleError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    const getPeopleFromServer = async () => {
      try {
        setLoading(true);
        const peopleFromServer = await getPeople();

        const peopleWithParents = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer.find(
            parent => parent.name === person.motherName,
          ),
          father: peopleFromServer.find(
            parent => parent.name === person.fatherName,
          ),
        }));

        setPeople(peopleWithParents);
        setShowFilters(true);
      } catch {
        handleError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    getPeopleFromServer();
  }, []);

  return (
    <>
      <div className="column">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!people.length && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Name
                      <SearchLink
                        // href="#/people?sort=name"
                        params={{ sort: 'name' }}
                      >
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Sex
                      <SearchLink
                        // href="#/people?sort=sex"
                        params={{ sort: 'sex' }}
                      >
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Born
                      <SearchLink
                        // href="#/people?sort=born&amp;order=desc"
                        params={{ sort: 'born', order: 'desc' }}
                      >
                        <span className="icon">
                          <i className="fas fa-sort-up" />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Died
                      <SearchLink
                        // href="#/people?sort=died"
                        params={{ sort: 'died' }}
                      >
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map((person: Person) => (
                  <PersonLink key={person.slug} person={person} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
