import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

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
  } = person;

  const { selectedSlug } = useParams();

  const mother = motherName || '-';
  const father = fatherName || '-';

  const motherSlug = people.find(human => human.name === motherName)?.slug;
  const fatherSlug = people.find(human => human.name === fatherName)?.slug;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selectedSlug === slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
          }}
          className={cn({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherSlug
          ? (
            <Link
              to={`/people/${motherSlug}`}
              className="has-text-danger"
            >
              {mother}
            </Link>
          )
          : mother}
      </td>
      <td>
        {fatherSlug
          ? (
            <Link to={`/people/${fatherSlug}`}>
              {father}
            </Link>
          )
          : father}
      </td>
    </tr>
  );
};
