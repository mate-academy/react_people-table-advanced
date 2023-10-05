import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonItem } from '../PersonItem';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';
import { Person, SearchParameters, SortValues } from '../../types';

type Props = {
  people: Person[];
  sort: string;
  order: string;
};

export const PeopleTable: React.FC<Props> = ({ people, sort, order }) => {
  const { slug: personSlug = '' } = useParams();

  function handleSortClick(newSortType: SortValues): SearchParams {
    const isFirstClick = newSortType !== sort;
    const isSecondClick = newSortType === sort && !order;

    if (isFirstClick) {
      return {
        [SearchParameters.Sort]: newSortType,
        [SearchParameters.Order]: null,
      };
    }

    if (isSecondClick) {
      return { [SearchParameters.Order]: 'desc' };
    }

    return {
      [SearchParameters.Sort]: null,
      [SearchParameters.Order]: null,
    };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortValues).map(([key, value]) => {
            const isSortMatchValue = sort === value;

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={handleSortClick(value)}>
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': !isSortMatchValue,
                        'fa-sort-up': isSortMatchValue && !order,
                        'fa-sort-down': isSortMatchValue && order,
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem
            key={person.slug}
            selectedSlug={personSlug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
