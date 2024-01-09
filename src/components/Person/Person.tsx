import { FC } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person as PersonType } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: PersonType,
  findSlug: (name: string) => string,
};

export const Person: FC<Props> = ({
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
      <td aria-label="person link">
        <PersonLink
          sex={person.sex}
          name={person.name}
          slug={person.slug}
        />
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
