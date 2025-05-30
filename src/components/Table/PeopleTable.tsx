import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { PeopleTableHeader } from './PeopleTableHeader';

interface PeopleTableProps {
  people: Person[];
  selectedSlug: string | undefined;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHeader />
      <tbody>
        {people.map((person: Person) => {
          const {
            sex,
            born,
            died,
            slug,
            fatherName,
            motherName,
            father,
            mother,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : (motherName ?? '-')}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : (fatherName ?? '-')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
