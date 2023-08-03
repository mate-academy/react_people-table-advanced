import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
  selectedSlug?: string;
};

export const PersonInfo: React.FC<Props> = ({
  person,
  people,
  selectedSlug,
}) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedSlug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({
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
        {person.motherName ? (
          <PersonLink
            name={person.motherName}
            people={people}
          />
        ) : ('-')}
      </td>
      <td>
        {person.fatherName ? (
          <PersonLink
            name={person.fatherName}
            people={people}
          />
        ) : ('-')}
      </td>
    </tr>
  );
};
