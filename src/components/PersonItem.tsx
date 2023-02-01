import cn from 'classnames';
import { FC, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person
}

export const PersonItem: FC<Props> = memo(({ person }) => {
  const {
    name, sex, born, died, motherName, fatherName, mother, father, slug,
  } = person;
  const { slug: selectedPersonSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': selectedPersonSlug === slug })}
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
        {mother
          ? (
            <Link
              to={mother.slug}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? <Link to={father.slug}>{fatherName}</Link>
          : fatherName || '-'}
      </td>
    </tr>
  );
});
