import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};
export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const selectedSlug = slug ? slug : 0;

  const personsMother = people.find(
    mother => mother.name === person.motherName,
  );

  const personsFather = people.find(
    father => father.name === person.fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': selectedSlug === person.slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={classNames('', { 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {personsMother ? (
          <Link
            to={{
              pathname: `/people/${personsMother?.slug}`,
              search: searchParams.toString(),
            }}
            className="has-text-danger"
          >
            {person.motherName || `-`}
          </Link>
        ) : (
          person.motherName || `-`
        )}
      </td>

      <td>
        {personsFather ? (
          <Link
            to={{
              pathname: `/people/${personsFather?.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.fatherName || `-`}
          </Link>
        ) : (
          person.fatherName || `-`
        )}
      </td>
    </tr>
  );
};
