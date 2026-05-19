import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  error: boolean;
  loading: boolean;
};

export const PeopleTable = ({ people, error, loading }: Props) => {
  const { slug } = useParams();

  const getPersonLink = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const person = people.find(p => p.name === name);

    if (person) {
      return <PersonLink person={person} />;
    }

    return name;
  };

  return (
    <div className="container">
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && !loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!error && !loading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && (
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
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={
                      person.slug === String(slug)
                        ? 'has-background-warning'
                        : ''
                    }
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{getPersonLink(person.motherName)}</td>
                    <td>{getPersonLink(person.fatherName)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
