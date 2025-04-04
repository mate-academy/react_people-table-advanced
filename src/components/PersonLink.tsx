import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
  markedPerson: boolean;
};

const PersonLink: React.FC<Props> = ({ person, people, markedPerson }) => {
  const { motherName, fatherName } = person;
  const displayMother = motherName || '-';
  const displayFather = fatherName || '-';

  const motherInList = people.find(p => p.name === displayMother);
  const fatherInList = people.find(p => p.name === displayFather);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': markedPerson })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {motherInList ? (
          <a className="has-text-danger" href={`#/people/${motherInList.slug}`}>
            {displayMother}
          </a>
        ) : (
          displayMother
        )}
      </td>

      <td>
        {fatherInList ? (
          <a href={`#/people/${fatherInList.slug}`}>{displayFather}</a>
        ) : (
          displayFather
        )}
      </td>
    </tr>
  );
};

export default PersonLink;
