import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { Sort } from '../types/Sort';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortParams = (param: string) => {
    if (sort !== param) {
      return {
        sort: param,
        order: null,
      };
    }

    if (sort === param && order !== 'desc') {
      return { sort: param, order: 'desc' };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const iconClass = (param: string) => classNames('fas', {
    'fa-sort': !sort || sort !== param,
    'fa-sort-up': sort === param && !order,
    'fa-sort-down': sort === param && order,
  });

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
              <SearchLink params={sortParams(Sort.name)}>
                <span className="icon">
                  <i className={iconClass(Sort.name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sortParams(Sort.sex)}>
                <span className="icon">
                  <i className={iconClass(Sort.sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={sortParams(Sort.born)}>
                <span className="icon">
                  <i className={iconClass(Sort.born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={sortParams(Sort.died)}>
                <span className="icon">
                  <i className={iconClass(Sort.died)} />
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
          <PersonLink person={person} data={people} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
