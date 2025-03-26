import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { PersonLink } from '../../components/PersonLink/PersonLink';
import { Person } from '../../types';
import cn from 'classnames';

interface Props {
  people: Person[] | null;
  isLoading: boolean;
  hasError: boolean;
}

export const PeopleTable = ({ people, isLoading, hasError }: Props) => {
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people && people?.length >= 1 && (
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
                {people?.map(person => {
                  return (
                    <tr
                      key={person.slug}
                      className={cn({
                        'has-background-warning': person.slug === slug,
                      })}
                      data-cy="person"
                    >
                      <td>
                        <PersonLink name={person.name} people={people} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        <PersonLink name={person.motherName} people={people} />
                      </td>
                      <td>
                        <PersonLink name={person.fatherName} people={people} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
