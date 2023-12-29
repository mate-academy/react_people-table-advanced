import cn from 'classnames';
import { FC } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person
  people: Person[]
}

export const PersonLink: FC<Props> = ({ person, people }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();

  const mother = people
    .find(motherToFind => motherToFind.name === person.motherName || null);

  const father = people
    .find(fatherToFind => fatherToFind.name === person.fatherName || null);

  return (
    <tr
      className={cn({ 'has-background-warning': slug === personSlug })}
      data-cy="person"
    >
      <td>
        <Link
          to={personSlug ? `../${slug}?${searchParams.toString()}` : `${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={personSlug
              ? `../${mother.slug}?${searchParams.toString()}`
              : `/people/${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={personSlug
              ? `../${father.slug}?${searchParams.toString()}`
              : `/people/${father.slug}`}
          >
            {father.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
