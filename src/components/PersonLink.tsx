import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother = people.find(p => p.name === motherName),
    father = people.find(p => p.name === fatherName),
  } = person;

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <Link to={`../${slug}`} className={cn({ 'has-text-danger': sex === 'f' })}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <Link to={`../${mother.slug}`} className="has-text-danger">
              {mother.name}
            </Link>
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <Link to={`../${father.slug}`}>
              {father.name}
            </Link>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
