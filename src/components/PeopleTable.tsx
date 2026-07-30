/* eslint-disable jsx-a11y/control-has-associated-label */

import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SortField } from '../types/SortField';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

type SortableHeaderProps = {
  title: string;
  field: SortField;
  currentSort: string | null;
  currentOrder: string | null;
};

const SortableHeader: React.FC<SortableHeaderProps> = ({
  title,
  field,
  currentSort,
  currentOrder,
}) => {
  const isCurrent = currentSort === field;
  const isDescending = isCurrent && currentOrder === 'desc';

  let nextSort: string | null = field;
  let nextOrder: string | null = null;

  if (isCurrent && !isDescending) {
    nextOrder = 'desc';
  }

  if (isDescending) {
    nextSort = null;
    nextOrder = null;
  }

  const iconClass = !isCurrent
    ? 'fas fa-sort'
    : isDescending
      ? 'fas fa-sort-down'
      : 'fas fa-sort-up';

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}

        <SearchLink
          params={{
            sort: nextSort,
            order: nextOrder,
          }}
        >
          <span className="icon">
            <i className={iconClass} />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const peopleByName = new Map(people.map(person => [person.name, person]));

  const renderRelative = (relativeName: string | null) => {
    if (!relativeName) {
      return '-';
    }

    const relative = peopleByName.get(relativeName);

    if (!relative) {
      return relativeName;
    }

    return (
      <SearchLink
        to={`/people/${relative.slug}`}
        params={{}}
        className={relative.sex === 'f' ? 'has-text-danger' : ''}
      >
        {relative.name}
      </SearchLink>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className={[
        'table',
        'is-striped',
        'is-hoverable',
        'is-narrow',
        'is-fullwidth',
      ].join(' ')}
    >
      <thead>
        <tr>
          <SortableHeader
            title="Name"
            field={SortField.Name}
            currentSort={currentSort}
            currentOrder={currentOrder}
          />

          <SortableHeader
            title="Sex"
            field={SortField.Sex}
            currentSort={currentSort}
            currentOrder={currentOrder}
          />

          <SortableHeader
            title="Born"
            field={SortField.Born}
            currentSort={currentSort}
            currentOrder={currentOrder}
          />

          <SortableHeader
            title="Died"
            field={SortField.Died}
            currentSort={currentSort}
            currentOrder={currentOrder}
          />

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === personSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <SearchLink
                to={`/people/${person.slug}`}
                params={{}}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </SearchLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderRelative(person.motherName)}</td>
            <td>{renderRelative(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
