/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { Person, SortBy } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findParent = (nameParent: string | null) => {
    return people.find(person => nameParent === person.name);
  };

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sortParams = (field: SortBy) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (sort === field && !order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getClassNames = (field: SortBy) => {
    return classNames('fas', {
      'fa-sort': sort !== field,
      'fa-sort-up': sort === field && !order,
      'fa-sort-down': sort === field && order,
    });
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
              <SearchLink params={sortParams(SortBy.name)}>
                <span className="icon">
                  <i className={getClassNames(SortBy.name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sortParams(SortBy.sex)}>
                <span className="icon">
                  <i className={getClassNames(SortBy.sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={sortParams(SortBy.born)}>
                <span className="icon">
                  <i className={getClassNames(SortBy.born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={sortParams(SortBy.died)}>
                <span className="icon">
                  <i className={getClassNames(SortBy.died)} />
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
          <PersonLink
            person={person}
            key={person.slug}
            findParent={findParent}
          />
        ))}
      </tbody>
    </table>
  );
};
