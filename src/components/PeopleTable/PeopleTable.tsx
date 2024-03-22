/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (columnName: string) => {
    if (sort !== columnName) {
      return { sort: columnName, order: null };
    }

    if (sort === columnName && !order) {
      return { sort: columnName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortingIcon = (
    columnName: string,
    sortParam: string | null,
    orderParam: string | null,
  ) => {
    return classNames('fas', {
      'fa-sort': sortParam !== columnName,
      'fa-sort-up': sortParam === columnName && !orderParam,
      'fa-sort-down': sortParam === columnName && orderParam,
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
              <SearchLink params={{ ...getSortParams('name') }}>
                <span className="icon">
                  <i className={getSortingIcon('name', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ ...getSortParams('sex') }}>
                <span className="icon">
                  <i className={getSortingIcon('sex', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ ...getSortParams('born') }}>
                <span className="icon">
                  <i className={getSortingIcon('born', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ ...getSortParams('died') }}>
                <span className="icon">
                  <i className={getSortingIcon('died', sort, order)} />
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
          <PersonLink key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
