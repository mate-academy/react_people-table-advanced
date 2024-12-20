import { FC } from 'react';
import { Parents, Person, PersonSex } from '../types';
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
            'has-text-danger': person.sex === PersonSex.Female,
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <ParentLink person={person} parent={Parents.Mother} />
      </td>
      <td>
        <ParentLink person={person} parent={Parents.Father} />
      </td>
    </tr>
  );
};

export default PersonRow;
