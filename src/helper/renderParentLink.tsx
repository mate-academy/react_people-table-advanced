import { Link } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

export const renderParentLink = (
  person: Person,
  people: Person[],
  parent: 'fatherName' | 'motherName',
  searchParams: URLSearchParams,
) => {
  const parentName: string | null = person[parent];

  if (!parentName) {
    return '-';
  }

  const parentPerson = people.find(p => p.name === parentName);

  if (!parentPerson) {
    return parentName;
  }

  return (
    <Link
      className={cn({ 'has-text-danger': parentPerson.sex === 'f' })}
      to={`/people/${parentPerson.slug}?${searchParams.toString()}`}
    >
      {parentPerson.name}
    </Link>
  );
};
