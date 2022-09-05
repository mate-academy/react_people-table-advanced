import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[],
  person: Person,
  isSelected: (person: Person) => boolean,
};

export const PersonLink: React.FC<Props> = ({ people, person, isSelected }) => {
  const mother = people.find(pers => pers.name === person.motherName);
  const father = people.find(pers => pers.name === person.fatherName);
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isSelected(person) },
      )}
    >
      <td>
        <Link
          to={{
            pathname: isSelected(person) ? parentPath : `${parentPath}${person.slug}`,
            search: location.search,
          }}
          className={classNames(
            { 'has-text-danger': person.sex === 'f' },
          )}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {mother
          ? (
            <Link
              className={classNames(
                { 'has-text-danger': mother.sex === 'f' },
              )}
              to={`../${mother.slug}`}
            >
              {person.motherName}
            </Link>
          )
          : (
            <p>
              {person.motherName || '-'}
            </p>
          )}
      </td>

      <td>
        {father
          ? (
            <Link
              className={classNames(
                { 'has-text-danger': father.sex === 'f' },
              )}
              to={`../${father.slug}`}
            >
              {person.fatherName || '-'}
            </Link>
          )
          : person.fatherName || '-'}

      </td>
    </tr>
  );
};
