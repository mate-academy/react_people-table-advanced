import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  setShowFilters: (arg: boolean) => void;
};

export const PeopleTable: React.FC<Props> = ({ setShowFilters }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (value: string) => ({
    sort: sort === value && order === 'desc' ? null : value,
    order: sort === value && order === null ? 'desc' : null,
  });

  const sortFilters = ['Name', 'Sex', 'Born', 'Died'];

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
                  {sortFilters.map((filter, index) => (
                    <th key={index}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {filter}
                        <SearchLink params={getSortParams(filter)}>
                          <span className="icon">
                            <i className="fas fa-sort" />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                  ))}

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
