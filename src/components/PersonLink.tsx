import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  isSelected: boolean,
};

export const PersonLink: FC<Props> = ({
  person,
  isSelected,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    mother,
    fatherName,
    father,
    slug,
  } = person;

  const parent = (
    parentName: string | null,
    parentLink: Person | null = null,
  ) => {
    switch (true) {
      case !!parentLink:
        return (
          <Link
            to={`../${parentLink?.slug}`}
            className={cn({ 'has-text-danger': parentLink?.sex === 'f' })}
          >
            {parentLink?.name}
          </Link>
        );
      case !!parentName:
        return (
          parentName
        );
      default:
        return '-';
    }
  };

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {parent(motherName, mother)}
      </td>
      <td>
        {parent(fatherName, father)}
      </td>
    </tr>
  );
};
