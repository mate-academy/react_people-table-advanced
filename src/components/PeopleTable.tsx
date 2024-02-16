import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { filterPeople, sortPeople } from '../utils/people';
import { SortFields } from '../types/SortFields';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') as SortFields;
  const order = searchParams.get('order');
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const filterSettings = {
    query,
    sex,
    centuries,
  };

  const handleSortChange = (sortValue: SortFields) => {
    if (sortBy === sortValue && order) {
      return { sort: null, order: null };
    }

    if (sortBy === sortValue) {
      return { sort: sortValue, order: 'desc' };
    }

    return { sort: sortValue, order: null };
  };

  const applyArrowStyles = (arrowValue: string) => {
    if (arrowValue === sortBy) {
      return cn('fas', {
        'fa-sort-up': !!sortBy && !order,
        'fa-sort-down': !!order,
      });
    }

    return cn('fas fa-sort');
  };

  const filteredPeople = sortBy
    ? filterPeople(sortPeople(people, sortBy, order), filterSettings)
    : filterPeople(people, filterSettings);

  return filteredPeople.length ? (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={handleSortChange(SortFields.Name)}>
                <span className="icon">
                  <i className={applyArrowStyles(SortFields.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortChange(SortFields.Sex)}>
                <span className="icon">
                  <i className={applyArrowStyles(SortFields.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortChange(SortFields.Born)}>
                <span className="icon">
                  <i className={applyArrowStyles(SortFields.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortChange(SortFields.Died)}>
                <span className="icon">
                  <i className={applyArrowStyles(SortFields.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {filteredPeople.map(person => {
          return (
            (
              <tr
                data-cy="person"
                key={person.slug}
                className={cn({
                  'has-background-warning': person.slug === slug,
                })}
              >
                <td>
                  <Link
                    to={`/people/${person.slug}?${searchParams.toString()}`}
                    className={person.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                {person.mother ? (
                  <td>
                    <Link
                      to={`/people/${person.mother.slug}?${searchParams.toString()}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  </td>
                ) : (
                  <td>{person.motherName ? person.motherName : '-'}</td>
                )}

                {person.father ? (
                  <td>
                    <Link to={`/people/${person.father.slug}?${searchParams.toString()}`}>
                      {person.fatherName}
                    </Link>
                  </td>
                ) : (
                  <td>{person.fatherName ? person.fatherName : '-'}</td>
                )}
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  ) : (
    <p data-cy="noPeopleMessage">
      There are no people matching the current search criteria
    </p>
  );
};
