import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { TableColumn } from './TableColumn';

type Props = {
  people: Person[],
};

const COLUMNS = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { peopleSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(column => (
            <TableColumn title={column} key={column} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === peopleSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? (<PersonLink person={person.mother} />)
                  : person.motherName}
              </td>
              <td>
                {person.father !== undefined
                  ? (<PersonLink person={person.father} />)
                  : person.fatherName}
              </td>
            </tr>
          );
        })}

      </tbody>
    </table>
  );
};
