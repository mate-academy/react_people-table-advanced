import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

export const findParent = (
  people: Person[],
  parent: string | null,
  searchParams: URLSearchParams,
) => {
  const parentSelected = people.find(human => human.name === parent);

  if (parentSelected) {
    return (
      <Link
        to={{
          pathname: `/people/${parentSelected.slug}`,
          search: searchParams.toString(),
        }}
        className={cn({
          'has-text-danger': parentSelected.sex === 'f',
        })}
      >
        {parentSelected.name}
      </Link>
    );
  }

  return parent || '-';
};
