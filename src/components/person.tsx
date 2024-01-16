/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person as PersonType } from '../types';
import { PersonLink } from './personLink';

type Props = {
  person: PersonType;
  people: PersonType[];
};

export const Person: React.FC<Props> = ({ person, people }) => {
  const mother = people.find(m => m.name === person.motherName) || null;
  const father = people.find(f => f.name === person.fatherName) || null;

  const { slug } = useParams();

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <PersonLink
          person={person}
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother
          ? (<PersonLink person={mother} />)
          : (person.motherName ?? '-')}
      </td>
      <td>
        {father
          ? (<PersonLink person={father} />)
          : (person.fatherName ?? '-')}
      </td>
    </tr>
  );
};
