import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  mothers: Person[];
  fathers: Person[];
  currentPath: string;
};

function parentPathName(parents: Person[], personParent: string | null) {
  return parents.find(parent => parent.name === personParent)?.slug
}

export const People: React.FC<Props> = ({
  person,
  fathers,
  mothers,
  currentPath,
}) => {
  const [searchParams] = useSearchParams();

  const { name, sex, born, died, fatherName, motherName, slug, } = person

  const currentParent = (parents: Person[], parentName: string | null) =>
    parents.map(parent => parent.name).includes(`${parentName}`);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': currentPath === `/people/${slug}`,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {currentParent(mothers, motherName) ? (
          <Link
            className="has-text-danger"
            to={{
              pathname: `/people/${parentPathName(mothers, motherName)}`,
              search: searchParams.toString(),
            }}
          >
            {motherName}
          </Link>
        ) : (
          `${motherName || '-'}`
        )}
      </td>

      <td>
        {currentParent(fathers, fatherName) ? (
          <Link
            to={{
              pathname: `/people/${parentPathName(fathers, fatherName)}`,
              search: searchParams.toString(),
            }}
          >
            {fatherName}
          </Link>
        ) : (
          `${fatherName || '-'}`
        )}
      </td>
    </tr>
  );
};
