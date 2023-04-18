import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonInfo } from './PersonInfo';
import { TableHead } from './TableHead';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHead />

      <tbody>
        {people.map(person => {
          const mother = people
            .find(human => human.name === person.motherName);
          const father = people
            .find(human => human.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames(
                { 'has-background-warning': person.slug === slug },
              )}
            >
              <PersonInfo
                person={person}
                personMother={mother}
                personFather={father}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
