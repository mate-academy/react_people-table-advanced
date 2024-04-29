import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { PeopleContext } from './PeopleContext';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, fatherName, motherName } = person;
  const { slug } = useParams();
  const { peopleList } = useContext(PeopleContext);
  const selectedPerson = slug;
  const [searchParams] = useSearchParams();

  const isPersonInList = (personName: string) => {
    const targetPerson = peopleList.find(human => human.name === personName);

    if (targetPerson) {
      return (
        <Link
          to={`/people/${targetPerson.slug}?${searchParams}`}
          className={classNames({
            'has-text-danger': targetPerson.sex === 'f',
          })}
        >
          {targetPerson.name}
        </Link>
      );
    }

    return undefined;
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedPerson,
      })}
      key={person.slug}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName
          ? isPersonInList(motherName)
            ? isPersonInList(motherName)
            : motherName
          : '-'}
      </td>
      <td>
        {fatherName
          ? isPersonInList(fatherName)
            ? isPersonInList(fatherName)
            : fatherName
          : '-'}
      </td>
    </tr>
  );
};
