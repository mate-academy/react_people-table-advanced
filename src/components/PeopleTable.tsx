/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Person, SortField, SortOrder } from '../types';
import { SearchParams } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
  sortField: SortField | null;
  sortOrder: SortOrder;
};

type SortableHeadingProps = {
  field: SortField;
  title: string;
  sortField: SortField | null;
  sortOrder: SortOrder;
};

const getNextSortParams = (
  field: SortField,
  sortField: SortField | null,
  sortOrder: SortOrder,
): SearchParams => {
  if (field !== sortField) {
    return { sort: field, order: null };
  }

  if (sortOrder === 'asc') {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
};

const SortableHeading: React.FC<SortableHeadingProps> = ({
  field,
  title,
  sortField,
  sortOrder,
}) => {
  const isCurrentField = field === sortField;
  const iconClass = classNames('fas', {
    'fa-sort': !isCurrentField,
    'fa-sort-up': isCurrentField && sortOrder === 'asc',
    'fa-sort-down': isCurrentField && sortOrder === 'desc',
  });

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink
          params={getNextSortParams(field, sortField, sortOrder)}
        >
          <span className="icon">
            <i className={iconClass} />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};

const renderParent = (name: string | null, parent?: Person) => {
  if (!name) {
    return '-';
  }

  return parent ? <PersonLink person={parent} /> : name;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sortField,
  sortOrder,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortableHeading
            field="name"
            title="Name"
            sortField={sortField}
            sortOrder={sortOrder}
          />
          <SortableHeading
            field="sex"
            title="Sex"
            sortField={sortField}
            sortOrder={sortOrder}
          />
          <SortableHeading
            field="born"
            title="Born"
            sortField={sortField}
            sortOrder={sortOrder}
          />
          <SortableHeading
            field="died"
            title="Died"
            sortField={sortField}
            sortOrder={sortOrder}
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
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(person.motherName, person.mother)}</td>
            <td>{renderParent(person.fatherName, person.father)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
