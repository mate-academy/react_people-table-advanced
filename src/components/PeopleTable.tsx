import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { TableColumnHead } from './TableColumnHead';

const COLUMNS = ['name', 'sex', 'born', 'died'];

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { peopleSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(column => (
            <TableColumnHead title={column} key={column} />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {
          people.map((person) => {
            const {
              sex,
              born,
              died,
              motherName,
              mother,
              fatherName,
              father,
              slug,
            } = person;

            return (
              <tr
                key={slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': slug === peopleSlug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {mother !== undefined
                    ? (<PersonLink person={mother} />)
                    : motherName}
                </td>
                <td>
                  {father !== undefined
                    ? (<PersonLink person={father} />)
                    : fatherName}
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
