import { FC } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person as PersonType } from '../../types';

type Props = {
  person: PersonType,
  findSlug: (name:string) => string | undefined,
};

export const PersonLink: FC<Props> = ({
  person,
  findSlug,

}) => {
  const { peopleId } = useParams();

  const motherName = person.motherName ? person.motherName : '-';
  const fatherName = person.fatherName ? person.fatherName : '-';

  const motherSlug = findSlug(motherName);
  const fatherSlug = findSlug(fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': peopleId === person.slug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={`../${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherSlug
          ? (
            <Link
              to={`../${motherSlug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          )
          : motherName}
      </td>
      <td>
        {fatherSlug
          ? (
            <Link
              to={`../${fatherSlug}`}
            >
              {fatherName}
            </Link>
          )
          : fatherName}
      </td>
    </tr>
  );
};
