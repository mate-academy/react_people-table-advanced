import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { SortField } from '../types/SortField';

import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const selectedSort = searchParams.get('sort');
  const selectedOrder = searchParams.get('order');

  const THEAD_NAMES: SortField[] = ['name', 'sex', 'born', 'died'];
  const FIELD_NAMES: Record<SortField, string> = {
    name: 'Name',
    sex: 'Sex',
    born: 'Born',
    died: 'Died',
  };

  const findPersonByName = (name: string): Person | null => {
    if (!name) {
      return null;
    }

    const foundPerson = people.find(person => person.name === name);

    return foundPerson || null;
  };

  const renderParentCell = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parentPerson = findPersonByName(parentName);

    if (parentPerson) {
      return <PersonLink person={parentPerson} />;
    }

    return parentName;
  };

  const handleTheadFilters = (
    field: SortField,
    currSort: string | null,
    currOrder: string | null,
  ) => {
    if (field !== currSort) {
      return { sort: field, order: null };
    }

    if (currOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (field: SortField) => {
    if (selectedSort === field && !selectedOrder) {
      return 'fas fa-sort-up';
    }

    if (selectedSort === field && selectedOrder) {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {THEAD_NAMES.map(title => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap is-capitalized">
                {FIELD_NAMES[title]}
                <SearchLink
                  params={handleTheadFilters(
                    title,
                    selectedSort,
                    selectedOrder,
                  )}
                >
                  <span className="icon">
                    <i className={getSortIconClass(title)} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = selectedSlug === person.slug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParentCell(person.motherName)}</td>
              <td>{renderParentCell(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
