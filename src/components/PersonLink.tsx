import classNames from 'classnames';
import { NavLink, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  isSelected: boolean,
};

export const PersonLink = ({ person, isSelected }: Props) => {
  const {
    name,
    sex,
    born,
    died,
    slug,
    fatherName,
    motherName,
    father,
    mother,
  } = person;

  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  const renderParent
  = (parentName: string | null, parent?: Person) => (
    parent
      ? (
        <NavLink
          to={{
            pathname: isSelected ? parentPath : parentPath + parent.slug,
            search: location.search,
          }}
          className={classNames({
            'has-text-danger': parent.sex === 'f',
          })}
        >
          {parent.name}
        </NavLink>
      )
      : parentName || '-'
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <NavLink
          to={{
            pathname: isSelected ? parentPath : parentPath + slug,
            search: location.search,
          }}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{renderParent(motherName, mother)}</td>
      <td>{renderParent(fatherName, father)}</td>
    </tr>
  );
};
