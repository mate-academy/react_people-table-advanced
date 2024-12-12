import { FC } from 'react';
import { Person } from '../types/Person';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ParentLink from './ParentLink';

type Props = {
  person: Person;
};

const PersonRow: FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const isActivePerson = slug === person.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isActivePerson,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
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
        <ParentLink person={person} parent={'mother'} />
      </td>
      <td>
        <ParentLink person={person} parent={'father'} />
      </td>
    </tr>
  );
};

export default PersonRow;
