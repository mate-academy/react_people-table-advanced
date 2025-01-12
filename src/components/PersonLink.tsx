import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { people } = useContext(PeopleContext);
  const { slug } = useParams();
  const selectedPerson = slug ? slug : '';

  const getPersonByName = (name: string | null): Person | void => {
    const personFound = people.find(item => item.name === name);

    if (!personFound || !name) {
      return;
    }

    return personFound;
  };

  const motherFromList = getPersonByName(person.motherName);
  const fatherFromList = getPersonByName(person.fatherName);
  const dashMother = person.motherName || '-';
  const dashFather = person.fatherName || '-';

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': person.slug === selectedPerson,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherFromList ? (
          <Link
            to={`../${motherFromList.slug}`}
            className={classNames({
              'has-text-danger': motherFromList.sex === 'f',
            })}
          >
            {person.motherName}
          </Link>
        ) : (
          dashMother
        )}
      </td>
      <td>
        {fatherFromList ? (
          <Link to={`../${fatherFromList.slug}`}>{person.fatherName}</Link>
        ) : (
          dashFather
        )}
      </td>
    </tr>
  );
};
