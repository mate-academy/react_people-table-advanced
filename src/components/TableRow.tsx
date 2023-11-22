import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { Person } from '../types';

import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  slug?: string,
};

export const TableRow: React.FC<Props> = ({ person, slug }) => {
  return (
    <>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': slug === person.slug,
        })}
      >
        <td>
          <Link
            to={`../${person.slug}`}
            className={classNames({
              'has-text-link': person.sex === 'm',
              'has-text-danger': person.sex === 'f',
            })}
          >
            {person.name}
          </Link>
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>

        <td>
          {person.mother ? (
            <PersonLink person={person.mother} />
          ) : (
            person.motherName || '-'
          )}
        </td>

        <td>
          {person.father ? (
            <PersonLink person={person.father} />
          ) : (
            person.fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
