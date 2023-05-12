import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person | undefined,
  personName?: string,
}

export const PersonLink: React.FC<Props> = ({ person, personName }) => (
  <>
    {person ? (
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames(
            {
              'has-text-danger': person.sex === 'f',
            },
          )}
        >
          {person.name}
        </Link>
      </td>
    ) : (
      <td>{personName}</td>
    )}
  </>
);
