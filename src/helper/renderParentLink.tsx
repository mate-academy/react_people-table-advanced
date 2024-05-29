import { Link } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { ROUTES } from '../utils/routes';

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

  const parentPerson = people.find(
    personFromPeople => personFromPeople.name === parentName,
  );

  if (!parentPerson) {
    return parentName;
  }

  return (
    <Link
      className={cn({ 'has-text-danger': parentPerson.sex === 'f' })}
      to={`/${ROUTES.PEOPLE}/${parentPerson.slug}?${searchParams.toString()}`}
    >
      {parentPerson.name}
    </Link>
  );
};
