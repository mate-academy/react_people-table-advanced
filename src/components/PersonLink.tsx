import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

function renderParent(
  parentName: string | null,
  parentPerson: Person | undefined,
  search: string,
): string | JSX.Element {
  if (!parentName) {
    return '-';
  }

  if (!parentPerson) {
    return parentName;
  }

  return (
    <Link
      className={classNames({
        'has-text-danger': parentPerson.sex === 'f',
      })}
      to={{
        pathname: `/people/${parentPerson.slug}`,
        search,
      }}
    >
      {parentPerson.name}
    </Link>
  );
}

export default function PersonLink({ person }: { person: Person }) {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search,
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
      <td>{renderParent(person.motherName, person.mother, search)}</td>
      <td>{renderParent(person.fatherName, person.father, search)}</td>
    </tr>
  );
}
