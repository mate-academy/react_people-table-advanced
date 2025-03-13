import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
  markedPerson: boolean;
};

const PersonLink: React.FC<Props> = ({ person, people, markedPerson }) => {
  const motherName = person.motherName ? person.motherName : '-';
  const fatherName = person.fatherName ? person.fatherName : '-';

  const motherInList = people.find(personn => personn.name === motherName);
  const fatherInList = people.find(personn => personn.name === fatherName);

  return (
    <>
      <tr
        data-cy="person"
        key={person.name}
        className={classNames({
          'has-background-warning': markedPerson,
        })}
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
        <td className="">
          {motherInList ? (
            <a
              className="has-text-danger"
              href={`#/people/${motherInList.slug}`}
            >
              {motherName}
            </a>
          ) : (
            motherName
          )}
        </td>
        <td>
          {fatherInList ? (
            <a href={`#/people/${fatherInList.slug}`}>{fatherName}</a>
          ) : (
            fatherName
          )}
        </td>
      </tr>
    </>
  );
};

export default PersonLink;
