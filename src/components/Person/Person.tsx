import { useParams, Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person;
}

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const selectedPerson = personSlug ?? null;
  const location = useLocation();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === selectedPerson,
      })}
    >
      <td>
        {person.slug === selectedPerson ? (
          <Link to={{ pathname: '/people', search: location.search }}>
            {person.name}
          </Link>
        ) : (
          <PersonLink name={person.name} slug={person.slug} sex={person.sex} />
        )}
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        <PersonLink
          name={person.motherName}
          slug={person.mother?.slug ?? null}
          sex="f"
        />
      </td>

      <td>
        <PersonLink
          name={person.fatherName}
          slug={person.father?.slug ?? null}
          sex="m"
        />
      </td>
    </tr>
  );
};
