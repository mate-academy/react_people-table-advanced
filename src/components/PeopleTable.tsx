/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchParams } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const SORT_COLUMNS = [
  { title: 'Name', field: 'name' },
  { title: 'Sex', field: 'sex' },
  { title: 'Born', field: 'born' },
  { title: 'Died', field: 'died' },
];

const renderParent = (name: string | null, parent?: Person) => {
  if (parent) {
    return <PersonLink person={parent} />;
  }

  return name || '-';
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // 1st click -> ascending, 2nd click -> descending, 3rd click -> no sorting
  const getSortParams = (field: string): SearchParams => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    if (order !== 'desc') {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_COLUMNS.map(({ title, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={classNames('fas', getSortIconClass(field))} />
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
