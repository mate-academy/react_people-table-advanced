import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';

type Props = {
  selectedSlug?: string;
};

export const Table: React.FC<Props> = ({ selectedSlug }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(response => setPeople(response))
      .catch(() => {
        setErrorMessage('Some loading error occured');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {/* <Loader />

        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>

        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p> */}
        {isLoading && (
          <Loader />
        )}

        {errorMessage && !isLoading && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!errorMessage && !isLoading && !people.length && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!errorMessage && !isLoading && people.length > 0 && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
            <tbody>
              {people.map(person => (
                <PersonInfo
                  person={person}
                  people={people}
                  selectedSlug={selectedSlug}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
