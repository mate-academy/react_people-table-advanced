import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const [searchParams] = useSearchParams();
  const { urlSlug } = useParams();
  const {
    name, sex, born, died, fatherName, motherName, slug,
  } = person;

  function getMother() {
    const mother = people.find((p) => p.name === motherName);

    if (mother) {
      return (
        <Link
          to={
            urlSlug
              ? `../${mother.slug}?${searchParams.toString()}`
              : `/people/${mother.slug}`
          }
          className="has-text-danger"
        >
          {mother.name}
        </Link>
      );
    }

    return motherName || '-';
  }

  function getFather() {
    const father = people.find((p) => p.name === fatherName);

    if (father) {
      return (
        <Link
          to={
            urlSlug
              ? `../${father.slug}?${searchParams.toString()}`
              : `/people/${father.slug}`
          }
        >
          {father.name}
        </Link>
      );
    }

    return fatherName || '-';
  }

  return (
    <tr
      className={cn({ 'has-background-warning': slug === urlSlug })}
      data-cy="person"
    >
      <td>
        <Link
          to={urlSlug ? `../${slug}?${searchParams.toString()}` : `${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{getMother()}</td>
      <td>{getFather()}</td>
    </tr>
  );
};
