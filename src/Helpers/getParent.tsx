import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

const isPersonExistInList = (personName: string | null, people: Person[]) => {
  return people.find(person => person.name === personName);
};

export const getParent = (
  person: Person,
  parentType: 'father' | 'mother',
  people: Person[],
) => {
  const parentTypeName = parentType === 'mother'
    ? 'motherName'
    : 'fatherName';

  if (!person[parentTypeName]) {
    return <td>-</td>;
  }

  const foundPerson = isPersonExistInList(person[parentTypeName], people);

  if (foundPerson) {
    return (
      <td>
        <Link
          className={cn({
            'has-text-danger': foundPerson.sex === 'f',
          })}
          to={`/people/${foundPerson.slug}`}
        >
          {foundPerson.name}
        </Link>
      </td>
    );
  }

  return (
    <td>
      {person[parentTypeName]}
    </td>
  );
};
