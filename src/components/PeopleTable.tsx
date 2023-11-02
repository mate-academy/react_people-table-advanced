import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || null;
  const orderParam = searchParams.get('order') || null;

  const getSearchParams = (field: string) => {
    const newSort = sortParam === field && orderParam === 'desc'
      ? null
      : field;

    let newOrder = null;

    if (sortParam === field) {
      newOrder = orderParam
        ? null
        : 'desc';
    }

    const newParams = {
      sort: newSort,
      order: newOrder,
    };

    return newParams;
  };

  const getSortClass = (changeSort: string) => {
    return classNames('fas', {
      'fa-sort': sortParam !== changeSort,
      'fa-sort-up': sortParam === changeSort && orderParam !== 'desc',
      'fa-sort-down': sortParam === changeSort && orderParam === 'desc',
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
              <SearchLink
                params={getSearchParams('name')}
              >
                <span className="icon">
                  <i className={getSortClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSearchParams('sex')}
              >
                <span className="icon">
                  <i className={getSortClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSearchParams('born')}
              >
                <span className="icon">
                  <i className={getSortClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSearchParams('died')}
              >
                <span className="icon">
                  <i className={getSortClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
