import { FC, memo, useMemo } from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SortParam } from '../types/SortParam';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { FilterPeople, sortPeople } from '../utils/PreparePeopleHelper';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = memo(({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const gender = searchParams.get('sex');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const century = searchParams.getAll('century');

  const onSort = (sortName: SortParam) => {
    if (sort !== sortName) {
      return { sort: sortName, order: null };
    }

    if (sort === sortName && !order) {
      return { sort: sortName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const filteredPeople = useMemo(() => FilterPeople(
    people, gender, query, century,
  ), [people, gender, query, century]);

  const sortedPeople = useMemo(() => sortPeople(
    filteredPeople, sort, order,
  ), [filteredPeople, sort, order]);

  return (
    <>
      {sortedPeople.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink params={onSort(SortParam.Name)}>
                    <span className="icon">
                      <i className={cn('fas', {
                        'fa-sort': sort !== SortParam.Name,
                        'fa-sort-up': sort === SortParam.Name && !order,
                        'fa-sort-down': sort === SortParam.Name && order,
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={onSort(SortParam.Sex)}>
                    <span className="icon">
                      <i className={cn('fas', {
                        'fa-sort': sort !== SortParam.Sex,
                        'fa-sort-up': sort === SortParam.Sex && !order,
                        'fa-sort-down': sort === SortParam.Sex && order,
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={onSort(SortParam.Born)}>
                    <span className="icon">
                      <i className={cn('fas', {
                        'fa-sort': sort !== SortParam.Born,
                        'fa-sort-up': sort === SortParam.Born && !order,
                        'fa-sort-down': sort === SortParam.Born && order,
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={onSort(SortParam.Died)}>
                    <span className="icon">
                      <i className={cn('fas', {
                        'fa-sort': sort !== SortParam.Died,
                        'fa-sort-up': sort === SortParam.Died && !order,
                        'fa-sort-down': sort === SortParam.Died && order,
                      })}
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
            {sortedPeople.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={cn(
                  { 'has-background-warning': person.slug === slug },
                )}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.mother
                    ? <PersonLink person={person.mother} />
                    : person.motherName || '-'}
                </td>
                <td>
                  {person.father
                    ? <PersonLink person={person.father} />
                    : person.fatherName || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
});
