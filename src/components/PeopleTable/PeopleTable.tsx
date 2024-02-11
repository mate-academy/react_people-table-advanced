import React from 'react';
import classNames from 'classnames';
import {
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getFilteredPeople } from '../../utils/filterPeople';
import { SearchParams } from '../../utils/searchHelper';
import { SortBy } from '../../types/SortBy';
import { SearchLink } from '../SearchLink';

const SORT_HEADERS = ['Name', 'Sex', 'Born', 'Died'];

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const sortField = searchParams.get('sort') as keyof Person || '';
  const sortOrder = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const getSortIconClass = (sortBy: string): string => {
    const sortByNormalized = sortBy.toLowerCase();

    return classNames('fas', {
      'fa-sort': sortField !== sortByNormalized,
      'fa-sort-up': sortField === sortByNormalized && sortOrder === SortBy.Desc,
      'fa-sort-down': sortField === sortByNormalized
        && sortOrder === SortBy.Asc,
    });
  };

  const getSortingParams = (sortBy: string): SearchParams => {
    if (!sortOrder) {
      return { order: SortBy.Asc, sort: sortBy };
    }

    if (sortOrder === SortBy.Asc) {
      return { order: SortBy.Desc };
    }

    return { sort: null, order: null };
  };

  const peopleToRender = getFilteredPeople(
    people,
    sortField,
    sortOrder,
    sex,
    query,
    centuries,
  );

  return (
    peopleToRender.length ? (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {SORT_HEADERS.map(sortItem => (
              <th key={sortItem}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortItem}
                  <SearchLink
                    params={getSortingParams(
                      sortItem.toLowerCase(),
                    )}
                  >
                    <span className="icon">
                      <i
                        className={
                          getSortIconClass(sortItem)
                        }
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
          {(!!people.length)
            && peopleToRender.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': person.slug === slug,
                })}
              >
                <td aria-labelledby={`label-${person.slug}`}>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {
                    person.mother?.name
                    && (
                      <PersonLink person={person.mother} />
                    )
                  }
                  {(!person.motherName && !person.mother?.name) && '-'}
                  {(person.motherName && !person.mother?.name)
                    && person.motherName}
                </td>
                <td>
                  {
                    person.father?.name
                    && (
                      <PersonLink person={person.father} />
                    )
                  }
                  {(!person.fatherName && !person.father?.name) && '-'}
                  {(person.fatherName && !person.father?.name)
                    && person.fatherName}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )
      : (
        <p>There are no people matching the current search criteria</p>
      )
  );
};
