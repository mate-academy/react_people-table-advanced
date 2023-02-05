import { useParams } from 'react-router-dom';

import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  isLoading: boolean,
  error: boolean,
};

export const PeopleTable: React.FC<Props> = ({ people, isLoading, error }) => {
  const { personId = '' } = useParams();

  const loadingOverSmoothly = !isLoading && !error;

  return (
    <div className="block">
      {isLoading && <Loader />}

      {(loadingOverSmoothly && people.length > 0) && (
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
              <PersonLink
                key={person.slug}
                person={person}
                people={people}
                selectedPerson={personId}
              />
            ))}
          </tbody>
        </table>
      )}

      {(loadingOverSmoothly && !people.length) && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {(!isLoading && error) && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </div>
  );
};
