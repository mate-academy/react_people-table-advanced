import React, { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleContext } from '../../../contexts/PeopleContext';
import { SearchOptions, SortField } from '../../../types';
import { SearchParams } from '../../../utils/searchHelper';
import { PersonItem } from '../../Person/Item';
import { SearchLink } from '../../Shared/SearchLink';

type Props = {};

export const PeopleList: React.FC<Props> = () => {
  const { visiblePeople } = useContext(PeopleContext);

  const { personId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchOptions.Sort) || '';
  const order = searchParams.get(SearchOptions.Order) || '';

  const getSortParams = (sortType: SortField): SearchParams => {
    if (sort !== sortType) {
      return {
        [SearchOptions.Sort]: sortType,
        [SearchOptions.Order]: null,
      };
    }

    if (sort === sortType && !order) {
      return { [SearchOptions.Order]: 'desc' };
    }

    return {
      [SearchOptions.Sort]: null,
      [SearchOptions.Order]: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortField).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink params={getSortParams(value)}>
                  <span className="icon">
                    <i className={classNames('fas', {
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
        {visiblePeople.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            selectedSlug={personId}
          />
        ))}
      </tbody>
    </table>
  );
};
