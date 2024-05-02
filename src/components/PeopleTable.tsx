import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSearchParams = (sortingBy: string) => {
    return {
      sort: sort === sortingBy && order === 'desc' ? null : sortingBy,
      order: sort === sortingBy && order === null ? 'desc' : null,
    };
  };

  const getSortLinkClassName = (sortingBy: string) => {
    return classNames('fas', {
      'fa-sort': sort !== sortingBy,
      'fa-sort-up': sort === sortingBy && !order,
      'fa-sort-down': sort === sortingBy && order,
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
              <SearchLink params={getSearchParams('name')}>
                <span className="icon">
                  <i className={getSortLinkClassName('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSearchParams('sex')}>
                <span className="icon">
                  <i className={getSortLinkClassName('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSearchParams('born')}>
                <span className="icon">
                  <i className={getSortLinkClassName('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSearchParams('died')}>
                <span className="icon">
                  <i className={getSortLinkClassName('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person: Person) => (
          <PersonRow key={person.slug} person={person} data-cy="person" />
        ))}
      </tbody>
    </table>
  );
};
