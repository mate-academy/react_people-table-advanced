import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type PeopleLinkProps = {
  person: Person;
};

export const PeopleLink: React.FC<PeopleLinkProps> = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName, mother, father } =
    person;
  const { slug } = useParams();
  const female = sex === 'f';
  const notParents = '-';

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link to={person.slug} className={cn({ 'has-text-danger': female })}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          motherName || notParents
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        ) : (
          fatherName || notParents
        )}
      </td>
    </tr>
  );
};
