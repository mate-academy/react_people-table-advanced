import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  peopleList: Person[];
}

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const findAvailableParentsSlug = (parent: Person) => {
    return {
      mother:
        peopleList.find(person => person.name === parent.motherName)?.slug ||
        '',
      father:
        peopleList.find(person => person.name === parent.fatherName)?.slug ||
        '',
    };
  };

  return (
    <>
      {peopleList.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
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
            {peopleList.map(person => {
              const parentsSlugs = findAvailableParentsSlug(person);

              return (
                <PersonLink
                  key={person.slug}
                  person={person}
                  parentsSlugs={parentsSlugs}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
