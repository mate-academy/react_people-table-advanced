import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';

  const getSortType = (field: string) => {
    if (!order && sort === field) {
      return {
        order: 'desk',
        sort: field,
      };
    }

    if (order && sort === field) {
      return {
        order: null,
        sort: null,
      };
    }

    return {
      order: null,
      sort: field,
    };
  };

  const getSortClass = (changeSortClass: string) => {
    return classNames(
      'fas',
      { 'fa-sort': sort !== changeSortClass },
      { 'fa-sort-up': sort === changeSortClass && !order },
      { 'fa-sort-down': sort === changeSortClass && order },
    );
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
                params={getSortType('name')}
              >
                <span className="icon">
                  <i
                    className={getSortClass('name')}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSortType('sex')}
              >
                <span className="icon">
                  <i
                    className={getSortClass('sex')}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortType('born')}
              >
                <span className="icon">
                  <i
                    className={getSortClass('born')}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSortType('died')}
              >
                <span className="icon">
                  <i
                    className={getSortClass('died')}
                  />
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
            key={person.slug}
            person={person}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
