/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const SORT_BY = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  let sortedPeople = [...people].sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return a[sort].localeCompare(b[sort]);

      case 'born':
      case 'died':
        return a[sort] - b[sort];

      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedPeople = sortedPeople.reverse();
  }

  const getSortParams = (param: string) => {
    return {
      sort: param === sort && isReversed ? null : param,
      order: param === sort && !isReversed ? 'desc' : null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_BY.map(field => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.slice(0, 1).toUpperCase() + field.slice(1)}
                <SearchLink className="icon" params={getSortParams(field)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': field !== sort,
                        'fa-sort-up': field === sort && !isReversed,
                        'fa-sort-down': field === sort && isReversed,
                      })}
                      role="button"
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
        {sortedPeople.map(person => (
          <PersonLink key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
