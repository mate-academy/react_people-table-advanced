/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { Person } from '../types';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

const COLUMNS: { title: string; field: SortField }[] = [
  { title: 'Name', field: 'name' },
  { title: 'Sex', field: 'sex' },
  { title: 'Born', field: 'born' },
  { title: 'Died', field: 'died' },
];

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const isDesc = searchParams.get('order') === 'desc';

  const getSortParams = (field: SortField): SearchParams => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (!isDesc) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getIconClass = (field: SortField) => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return isDesc ? 'fa-sort-down' : 'fa-sort-up';
  };

  const renderParent = (
    parentName: string | null,
    parent: Person | undefined,
  ) => {
    if (!parentName) {
      return '-';
    }

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(({ title, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={classNames('fas', getIconClass(field))} />
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
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
