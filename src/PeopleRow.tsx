import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './components/PersonLink';
import { Person } from './types';

type Props = {
  person: Person;
};

export const PeopleRow: React.FC<Props> = ({ person }) => {
  const {
    sex, born, died, fatherName, motherName, father, mother,
  } = person;
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >

      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? (<PersonLink person={mother} />) : (motherName || '-')}</td>
      <td>{father ? (<PersonLink person={father} />) : (fatherName || '-')}</td>
    </tr>
  );
};
