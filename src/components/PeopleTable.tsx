/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

const getNextSort = (
  currentSort: string | null,
  currentOrder: string | null,
  field: SortField,
) => {
  if (currentSort !== field) {
    return { sort: field, order: null };
  }

  if (currentOrder !== 'desc') {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
};

const sortIconByState = (
  currentSort: string | null,
  currentOrder: string | null,
  field: SortField,
) => {
  if (currentSort !== field) {
    return 'fas fa-sort';
  }

  return currentOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
};

const ParentCell: React.FC<{ parent?: Person; parentName: string | null }> = ({
  parent,
  parentName,
}) => {
  if (!parentName) {
    return <>-</>;
  }

  if (!parent) {
    return <>{parentName}</>;
  }

  return (
    <SearchLink
      to={`/people/${parent.slug}`}
      params={{}}
      className={classNames({ 'has-text-danger': parent.sex === 'f' })}
    >
      {parent.name}
    </SearchLink>
  );
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: SortField) => {
    const nextSort = getNextSort(sort, order, field);

    return {
      sort: nextSort.sort,
      order: nextSort.order,
    };
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={sortIconByState(sort, order, 'name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={sortIconByState(sort, order, 'sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={sortIconByState(sort, order, 'born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={sortIconByState(sort, order, 'died')} />
                </span>
              </SearchLink>
            </span>
          </th>

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
              <SearchLink
                to={`/people/${person.slug}`}
                params={{}}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </SearchLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <ParentCell
                parent={person.mother}
                parentName={person.motherName}
              />
            </td>
            <td>
              <ParentCell
                parent={person.father}
                parentName={person.fatherName}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
