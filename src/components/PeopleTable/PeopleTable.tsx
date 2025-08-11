import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';
import { useParams, useSearchParams } from 'react-router-dom';
import { SortFilters } from '../../utils/filters';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const selected = people.find(person => person.slug === slug);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortFilters).map(sortFilter => {
            const filterTitle =
              sortFilter.charAt(0).toUpperCase() + sortFilter.slice(1);

            return (
              <th key={sortFilter}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {filterTitle}
                  <SearchLink
                    params={{
                      sort:
                        sort === sortFilter && order === 'desc'
                          ? null
                          : sortFilter,
                      order:
                        sort === sortFilter
                          ? order === 'desc'
                            ? null
                            : 'desc'
                          : null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          {
                            'fa-sort': sort !== sortFilter,
                          },
                          {
                            'fa-sort-up':
                              sort === sortFilter && order !== 'desc',
                          },
                          {
                            'fa-sort-down':
                              sort === sortFilter && order === 'desc',
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem key={person.slug} person={person} selected={selected} />
        ))}
      </tbody>
    </table>
  );
};
