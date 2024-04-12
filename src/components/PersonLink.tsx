import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { NO_PARENT_LABEL } from '../utils/constants';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <Link
            to={{
              pathname: `/people/${person.mother.slug}`,
              search: searchParams.toString(),
            }}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName || NO_PARENT_LABEL
        )}
      </td>
      <td>
        {person.father ? (
          <Link
            to={{
              pathname: `/people/${person.father.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.fatherName}
          </Link>
        ) : (
          person.fatherName || NO_PARENT_LABEL
        )}
      </td>
    </tr>
  );
};
