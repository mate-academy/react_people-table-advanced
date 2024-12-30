import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import cn from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || null;
  const sortOrder = searchParams.get('order') || 'asc';

  const peopleWithParents = people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    return { ...person, mother, father };
  });

  const handleSort = (field: string) => {
    if (sortField === field && sortOrder === 'asc') {
      return setSearchParams({ sort: field, order: 'desc' });
    }

    if (sortField === field && sortOrder === 'desc') {
      return setSearchParams({});
    }

    return setSearchParams({ sort: field, order: 'asc' });
  };

  const sortedPeople = [...peopleWithParents].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const aValue = a[sortField as keyof Person];
    const bValue = b[sortField as keyof Person];

    if (aValue === null || aValue === undefined) {
      return 1;
    }

    if (bValue === null || bValue === undefined) {
      return -1;
    }

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }

    return 0;
  });

  const sortedIcon = (category: 'name' | 'sex' | 'born' | 'died') => {
    if (searchParams.get('sort') === category) {
      return searchParams.get('order') === 'desc'
        ? 'fa-sort-down'
        : 'fa-sort-up';
    }

    return 'fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                href="#/people?sort=name"
                onClick={event => {
                  event.preventDefault();
                  handleSort('name');
                }}
              >
                <span className="icon">
                  <i className={cn('fas', sortedIcon('name'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={event => {
                  event.preventDefault();
                  handleSort('sex');
                }}
              >
                <span className="icon">
                  <i className={cn('fas', sortedIcon('sex'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={event => {
                  event.preventDefault();
                  handleSort('born');
                }}
              >
                <span className="icon">
                  <i className={cn('fas', sortedIcon('born'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={event => {
                  event.preventDefault();
                  handleSort('died');
                }}
              >
                <span className="icon">
                  <i className={cn('fas', sortedIcon('died'))} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonLink key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
