import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { Sort } from '../types/Sort';
import { PersonRow } from './PersonRow';
import { SearchLink } from './SearchLink';

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
              <SearchLink params={getSearchParams(Sort.Name)}>
                <span className="icon">
                  <i className={getSortLinkClassName(Sort.Name)} />
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
              <SearchLink params={getSearchParams(Sort.Born)}>
                <span className="icon">
                  <i className={getSortLinkClassName(Sort.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSearchParams(Sort.Died)}>
                <span className="icon">
                  <i className={getSortLinkClassName(Sort.Died)} />
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
