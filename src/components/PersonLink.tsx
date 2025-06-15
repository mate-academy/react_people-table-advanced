import { FC, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import PersonName from './PersonName';

interface Props {
  person: Person;
  people: Person[];
}

const PersonLink: FC<Props> = ({ person: currentPerson, people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const findMother = useMemo(
    () => people.find(person => person.name === currentPerson.motherName),
    [currentPerson.motherName, people],
  );
  const findFather = useMemo(
    () => people.find(person => person.name === currentPerson.fatherName),
    [currentPerson.fatherName, people],
  );

  const renderNameWithLinkOrText = (
    name: string,
    person: Person | undefined,
  ) =>
    person ? (
      <Link
        className={person.sex === 'f' ? 'has-text-danger' : ''}
        to={{
          pathname: `/people/${person.slug}`,
          search: searchParams.toString(),
        }}
      >
        {name}
      </Link>
    ) : (
      name
    );

  return (
    <tr
      data-cy="person"
      className={`${slug === currentPerson.slug ? 'has-background-warning' : ''}`}
    >
      <td>{renderNameWithLinkOrText(currentPerson.name, currentPerson)}</td>
      <td>{currentPerson.sex}</td>
      <td>{currentPerson.born}</td>
      <td>{currentPerson.died}</td>
      <td>
        <PersonName
          name={currentPerson.motherName || '-'}
          person={findMother}
        />
      </td>
      <td>
        <PersonName
          name={currentPerson.fatherName || '-'}
          person={findFather}
        />
      </td>
    </tr>
  );
};

export default PersonLink;
