import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { mother, father } = person;
  const selectedRow = slug === person.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': selectedRow })}
    >
      <td>
        <PersonLink
          name={person.name}
          sex={person.sex}
          slug={person.slug}
        ></PersonLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <PersonLink
            name={mother.name}
            sex={mother.sex}
            slug={mother.slug}
          ></PersonLink>
        ) : (
          person.motherName
        )}
      </td>
      <td>
        {father ? (
          <PersonLink
            name={father.name}
            sex={father.sex}
            slug={father.slug}
          ></PersonLink>
        ) : (
          person.fatherName
        )}
      </td>
    </tr>
  );
};
