import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

enum Columns {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function handleArrowClick(column: string) {
    if (sort !== column) {
      return getSearchWith({ sort: column }, searchParams);
    }

    if (sort === column && !order) {
      return getSearchWith({ sort: column, order: 'desc' }, searchParams);
    }

    return getSearchWith({ sort: null, order: null }, searchParams);
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Columns)
            .map(([key, value]: [key: string, value: Columns]) => (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={{ search: handleArrowClick(value) }}>
                    <span className="icon">
                      <i className={cn('fas', {
                        'fa-sort': sort !== value,
                        'fa-sort-up': sort === value && !order,
                        'fa-sort-down': sort === value && order,
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
        {people.map(person => {
          return (
            <PersonLink
              person={person}
              people={people}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
