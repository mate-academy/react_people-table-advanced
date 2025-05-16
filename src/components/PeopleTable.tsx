/* eslint-disable no-console */
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleTableHeader } from './PeopleTableHeader';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug: string | undefined;
}

const sortPeople = (
  people: Person[],
  sortBy: string | null,
  order: string | null,
) => {
  if (!sortBy) {
    return people;
  }

  return [...people].sort((a, b) => {
    let aValue = a[sortBy as keyof Person];
    let bValue = b[sortBy as keyof Person];

    if (aValue === null || aValue === undefined) {
      aValue = '';
    }

    if (bValue === null || bValue === undefined) {
      bValue = '';
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (aValue < bValue) {
      return order === 'desc' ? 1 : -1;
    }

    if (aValue > bValue) {
      return order === 'desc' ? -1 : 1;
    }

    return 0;
  });
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortedPeople = sortPeople(people, sort, order);

  if (sortedPeople.length === 0) {
    return <p>No people available</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHeader />
      <tbody>
        {sortedPeople.map((person: Person) => {
          const {
            sex,
            born,
            died,
            slug,
            fatherName,
            motherName,
            father,
            mother,
          } = person;

          // eslint-disable-next-line no-console
          console.log('selectedSlug:', selectedSlug);
          // eslint-disable-next-line no-console
          console.log('current slug:', slug);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : (motherName ?? '-')}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : (fatherName ?? '-')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
