import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[],
}

const getSortParams = (sortType: any, isReversed: any, newSort: any) => {
  const sortParams = {
    sort: '',
    order: '',
  };

  if (sortType !== newSort && !isReversed) {
    sortParams.sort = newSort;
  }

  if (sortType === newSort && !isReversed) {
    sortParams.sort = newSort;
    sortParams.order = 'desc';
  }

  if (isReversed) {
    sortParams.order = '';
    sortParams.sort = '';
  }

  return sortParams;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [URLSearchParams] = useSearchParams();
  // const { people } = props;
  const { slug } = useParams();
  const isReversed = URLSearchParams.get('order');
  const sortType = URLSearchParams.get('sort') as keyof Person | null;

  const sortedPeople = useMemo(() => {
    if (!sortType) {
      return people;
    }

    const sorted = [...people].sort((a, b) => {
      const aValue = a[sortType];
      const bValue = b[sortType];

      // Porównanie dla numerów
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return isReversed === 'desc' ? bValue - aValue : aValue - bValue;
      }

      // Porównanie dla stringów
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return isReversed === 'desc'
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      return 0;
    });

    return sorted;
  }, [people, sortType, isReversed]);

  return (
    <div className="box table-container">
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
                  params={getSortParams(sortType, isReversed, 'name')}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sortType !== 'name',
                      'fa-sort-up': sortType === 'name' && !isReversed,
                      'fa-sort-down': sortType === 'name' && isReversed,
                    })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink
                  params={getSortParams(sortType, isReversed, 'sex')}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sortType !== 'sex',
                      'fa-sort-up': sortType === 'sex' && !isReversed,
                      'fa-sort-down': sortType === 'sex' && isReversed,
                    })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink
                  params={getSortParams(sortType, isReversed, 'born')}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sortType !== 'born',
                      'fa-sort-up': sortType === 'born' && !isReversed,
                      'fa-sort-down': sortType === 'born' && isReversed,
                    })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink
                  params={getSortParams(sortType, isReversed, 'died')}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sortType !== 'died',
                      'fa-sort-up': sortType === 'died' && !isReversed,
                      'fa-sort-down': sortType === 'died' && isReversed,
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
          {(!!sortedPeople.length)
            && sortedPeople.map(person => (
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
    </div>
  );
};
