import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { Person } from '../types';
import { getSortingParams } from '../helpers/getSortingParams';
import { PeopleRow } from '../PeopleRow';
import { Sort } from '../types/Sort';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Sort).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={getSortingParams(sort, order, value)}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sort !== value,
                      'fa-sort-up': sort === value && !order,
                      'fa-sort-down': sort === value,
                    })}
                    />
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
          <PeopleRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
