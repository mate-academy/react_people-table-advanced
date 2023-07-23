import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person, SortField, SortOrder } from '../types';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const toggleSortOption = (newSortField: SortField) => {
    const firstClick = sort !== newSortField;
    const secondClick = (sort === newSortField) && !order;

    if (firstClick) {
      return {
        sort: newSortField,
        order: null,
      };
    }

    if (secondClick) {
      return {
        sort,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortField).map(([label, field]) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={toggleSortOption(field)}>
                  <span className="icon">
                    <i className={classNames({
                      [SortOrder.Default]: sort !== field,
                      [SortOrder.Asc]: !order && sort === field,
                      [SortOrder.Desc]: order && sort === field,
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
          <PersonInfo
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
